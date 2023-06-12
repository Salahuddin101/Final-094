const mongoose = require('mongoose');
const Product = new mongoose.Schema({
    title:String,
    price : String,
    brand: String,
    product_details:String,
    breadcrumbs:String,
    images_list:{
        type:[String]
    
    },
    features: {
        type: [
          {
            name: String,
            attribute: String
          }
        ],
        
      }
      

  });
  const items = mongoose.model('item', Product);
  module.exports = items;