let express = require('express');
let YoutubeTranscript = require('youtube-transcript');
let bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = express.Router();
const models = require('./models/allModels');
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
    if (falseURl !== 'id' && falseURl !== 'getInfos' && falseURl !== 'en' && falseURl !== 'fr' && falseURl !== 'challenge' && falseURl !== 'suggest' && falseURl !== 'suggestMethod') {
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
    res.clearCookie('filter');
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
      
    } else if (req.cookies.filter === "duration") {
    var USVids = await models.find({category: req.params.category}).sort(({duration: 1}));
    var dura = 'selected';
    var diff = '';
   
    } else {
      var USVids = await models.find({category: req.params.category}).sort(({difficulty: -1}));
      var diff = 'selected';
      var dura = '';
      
    }
    var category = req.params.category;
    //var categoryUpperCase = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
    res.render('challenge', {USVids, category, diff, dura});
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/suggest', async (req, res) => {
    res.render('suggest');
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
}
);

app.post('/suggestMethod', async function (req, res) {

  const link = req.body.link;
  const category = req.body.category;
  const explanation = req.body.explanation;

  //Send data into DB
  
  
}
);

/* app.post('/getInfos', function (req, res) {
  var infos = req.i18n.t("informations");
  var infos2 = req.i18n.t("translateInfos");
  console.log(infos);

  res.json({ infos: infos, infos2: infos2 });
}); */


app.listen(8080)



/* const MongoClient = require('mongodb').MongoClient;

app.get('/challenge/:category', async (req, res) => {
  // Connection URL et nom de la base de données
  const url = 'mongodb://localhost:27017';
  const dbName = 'nom_de_la_base_de_donnees';

  // Connexion au client MongoDB
  const client = await MongoClient.connect(url);
  const db = client.db(dbName);

  // Récupération des documents de la collection "challenge"
  const collection = db.collection('challenge');
  const documents = await collection.find({ category: req.params.category }).toArray();

  // Transmission des données à la vue EJS
  res.render('challenge', { documents, category: req.params.category });

  // Fermeture de la connexion au client MongoDB
  client.close();
}); */







