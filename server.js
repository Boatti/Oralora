let express = require('express');
let YoutubeTranscript = require('youtube-transcript');
var bodyParser = require('body-parser')

let app = express()

app.set('view engine', 'ejs')

app.use('/assets', express.static('public'))

app.get('/', async (req, res) => {
  res.render('index');
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text({ type: "*/*" }));

app.post('/id', async function (req, res) {

  var onlyYtId = req.body;
  console.log('mecstp' + onlyYtId);
  try {
    let transcript = await YoutubeTranscript.default.fetchTranscript(onlyYtId, { lang: 'en' });
    //console.log(transcript);
    res.send(transcript);
  } catch (err) {
    res.status(500).send('Transcript error');
  }
}
);
// t0eqSgkDuW0
app.listen(8080)




/* let oui = async function (){
try { 
  let getYoutube = await YoutubeTranscript.default.fetchTranscript(setIframeSource.onlyUrlNumbers, {lang : 'en'});
  console.log(getYoutube);
  //res.json({getYoutube: getYoutube});
} catch (err) {
console.error(err);
res.status(500).send('Erreur lors de la récupération de la transcription');
}; 
}

oui; */





/* [
  { text: 'There was an idea', duration: 3281, offset: 3919 },
  { text: 'to bring together', duration: 5040, offset: 8400 },
  {
    text: 'a group'' of remarkable people',
    duration: 3520,
    offset: 9920
  },
  {
    text: 'to see if we could become something more',
    duration: 6240,
    offset: 13920
  },
  { text: '[Music]', duration: 4980, offset: 17900 },
  { text: 'so when they needed us', duration: 5920, offset: 20160 },
  { text: 'we could fight the battles', duration: 3200, offset: 22880 },
  { text: 'that they never could', duration: 13700, offset: 27199 },
  { text: '[Applause]', duration: 11899, offset: 29000 },
  { text: 'You', duration: 4800, offset: 46399 },
] */

/* 
[{text: "let's go to a place", duration: 5279, offset: 1120},
{text: 'where everything is made of blocks', duration: 7519, offset: 3040},
{text: 'where the only limit is your imagination', duration: 7360, offset: 6399},
{text: "let's go wherever you want to go climb", duration: 5761, offset: 10559},
{text: 'the tallest mountains', duration: 6401, offset: 13759},
{text: 'venture down to the darkest caves', duration: 3840, offset: 16320},
{text: 'build anything you want day or night', duration: 6799, offset: 20480},
{text: 'rain or shine because this is the most', duration: 5279, offset: 24160},
{text: "significant sandbox you'll ever set foot", duration: 3760, offset: 27279},
{text: 'in', duration: 4401, offset: 29439},
{text: 'build a majestic castle invent a new', duration: 3520, offset: 31039},
{text: 'machine', duration: 3280, offset: 33840},
{text: 'or take a ride on a roller coaster play', duration: 4000, offset: 34559},
{text: 'with friends', duration: 4320, offset: 37120},
{text: 'build your own little community protect', duration: 4481, offset: 38559},
{text: 'yourself with the strongest armor that', duration: 3040, offset: 41440},
{text: 'you can craft', duration: 4560, offset: 43040},
{text: 'and fight off the dangers of the night', duration: 4640, offset: 44480},
{text: 'no one can tell you what you can or', duration: 4400, offset: 47600},
{text: 'cannot do with no rules to follow', duration: 10720, offset: 49120},
{text: "this adventure it's up to you", duration: 7840, offset: 52000}] */


