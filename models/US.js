const mongoose = require("mongoose");

  var schemaDBB = new mongoose.Schema({
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
   
  module.exports = mongoose.model('Video', schemaDBB);