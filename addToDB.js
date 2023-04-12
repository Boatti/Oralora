const mongoose = require('mongoose');
const { models } = require('./models/allModels');
const enJSON = require('./db/enDB.json');
//const addData = require('./db/addData.json')
//const frJSON = require('./db/frDB.json');

const uri = "mongodb+srv://Boatti:4nOvG5Pq6jUMBNav@oralora.qnmxthm.mongodb.net/Oralora?retryWrites=true&w=majority";
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(`Connected to database ${db.name}`);
});

models.deleteMany({})
  .then(() => {
    // Insertion des nouveaux documents à partir du fichier JSON
    return models.insertMany(enJSON);
  })
  .then(result => {
    console.log(`${result.length} documents ont été ajoutés.`);
    mongoose.disconnect();
  })
  .catch(err => {
    console.error(err);
    mongoose.disconnect();
  });





