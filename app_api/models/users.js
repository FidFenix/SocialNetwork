var mongoose = require ('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var likeSchema = new mongoose.Schema({
  likeIndex:Number,
  likeType:String,
  user:{
    type:String,
    required:true
  }
});
var commentSchema = new mongoose.Schema({
  userId:{
    type:String,
    required:true
  },
  userName:{
    type:String,
    required:true
  },
  text:{
    type:String,
    required:true
  },
  date : {
    type:Date,
    "default":Date.now
  },
  likes:[likeSchema]
});
var messageSchema = new mongoose.Schema({
  body:{
    type:String,
    required:true
  },
  userId : {
    type:String,
    required:true
  },
  date : {
    type:Date,
    "default":Date.now
  }
});
var chatSchema = new mongoose.Schema({
  historyChat : [messageSchema],
  chatStatus : Number
});
var friendSchema = new mongoose.Schema({
  userId:{
    type:String,
    required:true
  },
  chat : chatSchema,
  permisions:Number
});
var photoSchema = new mongoose.Schema({
  data : {
    type:String,
    required:true
  },
  uploadDate: {
    type:Date,
    "default":Date.now
  },
  tags:[String],
  text:String,
  coords: {
    type:[Number],
    index:'2dsphere'
  },
  likes:[likeSchema],
  comments:[commentSchema]
});
var publicationSchema = new mongoose.Schema({
  date:{
    type:Date,
    "default":Date.now
  },
  text:{
    type:String
  },
  publicationPhoto:{
    type:String
  },
  likes:[likeSchema],
  comments:[commentSchema]
});
var userSchema = new mongoose.Schema({
  email:{
    type:String,
    unique:true,
    required:true
  },
  name:{
    type:String,
    required:true
  },
  /*firstName:{
    type:String,
    required:true
  },
  lastName:{
    type:String,
    required:true
  },*/
  hash:String,
  salt:String,
  photos:[photoSchema],
  birthdate:{
    type:Date
  },
  address:String,
  job:String,
  phone:{
    type:String,
    "default":"(+54)953-464-991"
  },
  gender:String,
  description:String,
  coverPage:{
    type:String,
    "default":"/img/default_cover.jpg"
  },
  profilePhoto:{
    type:String,
    "default":"/img/default.jpg"
  },    
  friends:[friendSchema],
  userStatus:{
    type:String,
    required:true,
    "default":"disconnect"
  },
  publications:[publicationSchema],
  url:{
    type:String,
    "default":"http://socialnetwork.heroku.com"
  },
  coords:{
    type:[Number],
    index:'2dsphere'
  },
 
});
userSchema.methods.setPassword= function( password ){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash=crypto.pbkdf2Sync(password,this.salt,1000,64).toString('hex');
};
userSchema.methods.validPassword= function(password){
  var hash = crypto.pbkdf2Sync(password,this.salt,1000,64).toString('hex');
  return this.hash==hash;
};
userSchema.methods.generateJwt = function(){
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7 );
  return jwt.sign({
    _id : this._id,
    email: this.email,
    name: this.name,
    exp: parseInt(expiry.getTime()/1000)
  },process.env.JWT_SECRET);
};
mongoose.model('User',userSchema);

