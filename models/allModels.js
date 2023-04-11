const mongoose = require("mongoose");

  var schemaDB = new mongoose.Schema({
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
   
  module.exports = mongoose.model('Video', schemaDB);
  
/*   var schemaDBEN = new mongoose.Schema({
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
    date: Date,
    explanation: String
  }, { collection: 'suggest' });

  const US = mongoose.model('US', schemaDBEN);
  const Suggest = mongoose.model('suggest', suggestDB);
  
  module.exports = { US, Suggest }; */

