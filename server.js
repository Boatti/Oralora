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
    console.log(transcript);
    res.send(transcript);
  } catch (err) {
    res.status(500).send('Transcript error');
  }
}
);
// t0eqSgkDuW0
app.listen(8080)






