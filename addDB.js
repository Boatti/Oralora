const mongoose = require('mongoose');
const { models } = require('./models/allModels');
const enJSON = require('./db/enDB.json');
const fs = require('fs');
//const addData = require('./db/addData.json')
//const frJSON = require('./db/frDB.json');

const uri = "mongodb+srv://Boatti:4nOvG5Pq6jUMBNav@oralora.qnmxthm.mongodb.net/Oralora?retryWrites=true&w=majority";
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(`Connected to database ${db.name}`);
});
try {
const modelsData = new models({
    link: link,
    category: category,
    lang: lang,
    explanation: explanation,
    date: gmtPlus2DateString
  });


    modelsData.save();
} catch (err) { 
    console.log(err);
}
 







