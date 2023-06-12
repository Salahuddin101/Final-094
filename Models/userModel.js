const mongoose = require('mongoose');
const Joi= require('@hapi/joi')
const user = mongoose.Schema({
    name: String,
    password : String,
    email: String,
    
      

});

  const users2= mongoose.model('user', user);
  function validateDataSignIn(data){
const schema=Joi.object({
  name: Joi.string().min(3).max(10).required(),
  password: Joi.string().min(3).max(10).required(),
 

});
return schema.validate(data,{abortEarly:false});

  }
  function validateDataSignUp(data){
    const schema=Joi.object({
      name: Joi.string().min(3).max(10).required(),
      password: Joi.string().min(3).max(10).required(),
     email:Joi.string().email().min(3).max(10).required()
    
    });
    return schema.validate(data,{abortEarly:false});
    
      }
     
  module.exports.User = users2;
  module.exports.validate=validateDataSignUp;
  module.exports.validateSignIn=validateDataSignIn