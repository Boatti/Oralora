const mongoose = require("mongoose");

   var schemaDBEN = new mongoose.Schema({
    id: String,
    title: String,
    channel: String,
    thumbnail: String,
    url: String,
    duration: String,
    difficulty: Number,
    accent: Number,
    cc: Number,
    quality: String,
    category: String
}, { collection: 'US' });
   
  var suggestDB = new mongoose.Schema({
    link: String,
    category: String,
    lang: String,
    explanation: String,
    date: Date,
  }, { collection: 'suggest', versionKey: false });

  const models = mongoose.model('US', schemaDBEN);
  const Suggest = mongoose.model('suggest', suggestDB);
  
  module.exports = { models, Suggest }; 

