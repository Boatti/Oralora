let express = require('express');
let YoutubeTranscript = require('youtube-transcript');
let bodyParser = require('body-parser');
const mongoose = require('mongoose');

let app = express()

app.set('view engine', 'ejs')

app.use('/assets', express.static('public'))

app.get('/', async (req, res) => {
  res.render('index');
});

app.get('/challenge', async (req, res) => {
  res.render('challenge');
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text({ type: "*/*" }));

app.post('/id', async function (req, res) {

  var onlyYtId = req.body;
  //console.log('mecstp' + onlyYtId);
  try {
    let transcript = await YoutubeTranscript.default.fetchTranscript(onlyYtId, {lang: 'en'});
    //console.log(transcript);
    res.send(transcript);
  } catch (err) {
    res.status(500).send('Transcript error');
  }
}
);
// t0eqSgkDuW0
app.listen(8080)

const MongoClient = require('mongodb').MongoClient;

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
});







