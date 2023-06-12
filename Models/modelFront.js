const mongoose = require('mongoose');
const front = new mongoose.Schema({
    name: String,
    price : Number,
    discounted_ratio: Number,
    img_url:String
        
      }
      

  );
  const items2 = mongoose.model('front', front);
  module.exports = items2;