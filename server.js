let express = require('express');
let YoutubeTranscript = require('youtube-transcript');
let bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = express.Router();
const { models, Suggest } = require('./models/allModels');
const i18next = require('i18next');
const i18nextMiddleware = require('i18next-http-middleware');
const Backend = require('i18next-fs-backend');
const cookieParser = require('cookie-parser');

//const path = require('path');
//const Video = require('./models/fr');
//const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://Boatti:4nOvG5Pq6jUMBNav@oralora.qnmxthm.mongodb.net/Oralora?retryWrites=true&w=majority";
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(`Connected to database ${db.name}`);
});

let app = express()

app.use(cookieParser());

app.set('view engine', 'ejs')

app.use('/assets', express.static('public'))

app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.json());
app.use(bodyParser.text({ type: "*/*" }));
  //app.use(express.bodyParser());
 // app.use(i18next.handle);
  //app.use(app.router);

i18next
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    /* detection: {
      order: ['path'], // Définit la méthode de détection de la langue via le chemin d'URL
      lookupFromPathIndex: 0 // Indice du segment de chemin contenant la langue, ici 0 pour '/:lng'
    }, */
    ns: ['challenge', 'header', 'index', 'suggest'],
    defaultNS: ['challenge', 'header', 'index', 'suggest'],
    backend: {
      loadPath: 'locales/{{lng}}/{{ns}}.json',
    },
    saveMissing: true,
    preload: ['en', 'fr'],
    fallbackLng: 'en',
  });

app.use('/:falseURl', (req, res, next) => {
    const falseURl = req.params.falseURl;
    if (falseURl !== 'id' && falseURl !== 'getInfos' && falseURl !== 'en' && falseURl !== 'fr' && falseURl !== 'challenge' && falseURl !== 'suggest' && falseURl !== 'suggestMethod' && falseURl !== 'popularityCount') {
      return res.redirect('/'); // Redirige vers la page d'accueil
    }
    next();
  });

app.use('/challenge/:falseUrl', (req, res, next) => {
    const falseUrl = req.params.falseUrl;
    if (falseUrl !== 'levels' && falseUrl !== 'short' && falseUrl !== 'movie' && falseUrl !== 'songs') {
      return res.redirect('/'); // Redirige vers la page d'accueil
    }
    next();
  });

app.use(i18nextMiddleware.handle(i18next /* {
  lookupCookie: 'i18next',
  caches: ['cookie']
} */));
app.use((req, res, next) => {
  res.locals.i18n = req.i18n;
  next();
});

app.get('/en', (req, res) => {
  //res.clearCookie('i18next');
  res.cookie('i18next', 'en', { maxAge: 30 * 24 * 60 * 60 * 1000});
  res.redirect('back');
});

app.get('/fr', (req, res) => {
  //res.clearCookie('i18next');
  res.cookie('i18next', 'fr', { maxAge: 30 * 24 * 60 * 60 * 1000});
  res.redirect('back');
});

app.get('/', async (req, res) => {
  res.render('index');
});

app.get('/challenge/:category', async (req, res) => {
  var filter = req.query.filter;
  if (filter) {
    res.cookie('filter', filter, { maxAge: 30 * 24 * 60 * 60 * 1000});
  }
  //console.log("cv ",filter);
  //console.log("cv 2 ",req.cookies.filter);

  //var i18n = req.i18n;
  try {
    if (req.cookies.filter === "difficulty") {
      var USVids = await models.find({category: req.params.category}).sort(({difficulty: -1}));
      var diff = 'selected';
      var dura = '';
      var popu = '';
      
    } else if (req.cookies.filter === "duration") {
    var USVids = await models.find({category: req.params.category}).sort(({duration: -1}));
    var dura = 'selected';
    var diff = '';
    var popu = '';
   
    } else if (req.cookies.filter === "popularity") {
      var USVids = await models.find({category: req.params.category}).sort(({popularity: -1}));
      var popu = 'selected';
      var diff = '';
      var dura = '';
    } // Par default
    else {
      var USVids = await models.find({category: req.params.category}).sort(({popularity: -1}));
      var popu = 'selected';
      var dura = '';
      var diff = '';
    }
    var category = req.params.category;
    res.render('challenge', {USVids, category, popu, diff, dura});
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/suggest', async (req, res) => {
  var wellSend;
    res.render('suggest',{wellSend});
});

app.post('/id', async function (req, res) {
  var onlyYtId = req.body;
  try {
    let transcript = await YoutubeTranscript.default.fetchTranscript(onlyYtId, {lang: 'en'});
    //console.log(transcript);
    res.send(transcript);
  } catch (err) {
    res.status(500).send('Transcript error');
  }
});

app.post('/suggestMethod', function (req, res) {

  const link = req.body.link;
  const category = req.body.category;
  const lang = req.body.lang;
  const explanation = req.body.explanation;
  const now = new Date();
  now.setHours(now.getHours() + 2); // Ajoute deux heures à la date actuelle
  const gmtPlus2DateString = now.toISOString();

  const suggestData = new Suggest({
    link: link,
    category: category,
    lang: lang,
    explanation: explanation,
    date: gmtPlus2DateString
  });
  try {
  suggestData.save();
   wellSend = true;
  } catch {  wellSend = false;
  }
  res.render('suggest', {wellSend});
});

app.post('/popularityCount', async function (req, res) {

  var getBody = req.body;
  console.log(getBody);

  await models.findOne({ id: getBody })
  .then(vids => {
    if (vids) {
      vids.popularity += 1;
      // Enregistrez les modifications dans la base de données
      return vids.save();
    } else {
      throw new Error('Video not found'); // Lève une nouvelle erreur avec un message personnalisé si l'image n'est pas trouvée
    }
  })
  .then(updatedImage => {
    // Les modifications ont été enregistrées avec succès
    console.log('Popularity updated', updatedImage.popularity);
  })
  .catch(error => {
    console.error(error); // Affiche l'erreur dans la console
    throw new Error('Error'); // Lève une nouvelle erreur avec un message personnalisé
  });
});

app.listen(8080)







