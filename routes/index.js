var express = require('express');
var router = express.Router();
var model=require("../Models/model")
var model2=require("../Models/modelFront")
var { User }=require("../Models/userModel")
var cart=[];
var auth=require("../Middleware/authent")
var loginStatus="false";
var becrypt=require('bcryptjs')
const _=require("lodash")
const jwt=require("jsonwebtoken")
/* GET home page. */
router.get('/', async function(req, res, next) {
var front=await model.find().limit(6);
console.log(front)


  res.render('index', {front});
});
function removeElementById(arr, idToRemove) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]._id === idToRemove) {
      arr.splice(i, 1);
      return;
    }
  }
}
router.post('/abc', async function(req, res, next) {
console.log(req.body.Search)
const query1 =  { title: { $regex: req.body.Search, $options: 'i' } };

var products=await model.find(query1).limit(10)

console.log(products)
var abc=await model.countDocuments(query1)
console.log(abc)
var searchQ=req.body.Search;

res.render('Searchbar',{products,abc,searchQ})

});
router.get('/page/:id/:searchQ/:abc', async function(req, res, next) {
  
 var id=parseInt(req.params.id)*10;
 const searchQ=req.params.searchQ;
 const abc=req.params.abc;
 const query1 =  { title: { $regex: searchQ, $options: 'i' } };
 var products=await model.find(query1).skip(id).limit(10)
var bb1=id/10;
 
 
  
    res.render('navigator', {products,bb1,searchQ,abc});
    
  });
  router.get('/AddCart/:id', async function(req, res, next) {
  
  console.log("This worked 1")
  if (loginStatus=="true")
  next();
  else{
    res.render('login')
  }



  });
  router.post('/login/confirmLogin', async function(req, res, next) {
    var name1=req.body.name;
    var pass2=req.body.password;
    console.log(pass2)
    let user= await User.findOne({name:name1})
    if(!user)return res.status(400).send("User not regestered");
    let isValid= await becrypt.compare(req.body.password,user.password)
    if(!isValid) return res.status(401).send("invalid pass");
    let token = jwt.sign({_id:user._id,name:user.name},"SomeprivateKey");
   
   
    console.log("signIn complete")
   loginStatus="true"
   var front=await model.find().limit(6);
   
   
   
     res.render('index', {front});

    
    //const query1 =  {  };
    //var products=await model.find(query1).skip(id).limit(10)
  
   

 
  })
  router.get('/AddCart/:id', async function(req, res) {

    var products=await model.find({_id:req.params.id})
    var z2=parseFloat(products[0].price.split("£")[1]);
    console.log("hellooooooooooooooooo123ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo"+z2)
    
    var dummyData={
      title:products[0].title,
      price:z2,
      _id:req.params.id,
      images_list:products[0].images_list,
      Quantity:1


    }
    cart.push(dummyData);
    products=cart
   
    res.render('showCart',{products})
   
  
  
    });
    router.get('/SignUp', async function(req, res) {
      res.render("SignUp");
      
     
    
    
      });
      router.post('/SignUp/ConfirmSignup', async function(req, res) {
        console.log(req.body)
        let salt= await becrypt.genSalt(9)
        let user= new User();
        user.name=req.body.name;
        user.password=req.body.password
        user.email=req.body.email
        user.password=await becrypt.hash(user.password,salt)
        await user.save();
        console.log("Successful SignUp")
        
        var front=await model.find();
        products=front;



      
  
        res.render('index', {prouducts}
  
  );
   
      
      
        });
        router.get('/DeleteCartitem/:id', async function(req, res) {
          console.log(req.params.id)
        removeElementById(cart,req.params.id)
        var products=cart;
        res.render('showCart',{products})

  
  
    
     
        
        
          });
          router.get('/adminPortal', async function(req, res) {
    res.render("adminPortal")
    
      
       
          
          
            });
          
module.exports = router;
