var mongoose = require ('mongoose');
var likeSchema = new mongoose.Schema({
  likeIndex:Number,
  likeType:String,
  userId:String
});
var commentSchema = new mongoose.Schema({
  userId:{type:String,required:true},
  text:{type:String,required:true},
  likes:[likeSchema]
});
var messageSchema = new mongoose.Schema({
  body:{type:String,required:true},
  userId : {type:String,required:true},
  date : {type:Date,"default":Date.now}
});
var chatSchema = new mongoose.Schema({
  historyChat : [messageSchema],
  chatStatus : Number
});
var friendSchema = new mongoose.Schema({
  userId:{type:String,required:true},
  chat : chatSchema,
  permisions:Number
});
var photoSchema = new mongoose.Schema({
  data : {type:String},
  uploadDate: {type:Date,"default":Date.now},
  tags:[String],
  text:String,
  coords: {type:[Number],index:'2dsphere'},
  likes:[likeSchema],
  comments:[commentSchema]
});
var publicationSchema = new mongoose.Schema({
  date:{type:Date,"default":Date.now},
  title:String,
  text:String,
  publicationPhoto:{type:String},
  comments:[commentSchema]
});

var userProfileSchema = new mongoose.Schema({
  name: {type:String,required:true},
  firstName:{type:String,required:true},
  lastName:{type:String,required:true},
  password:{type:String,required:true},
  email:{type:String,required:true},
  photos:[photoSchema],
  birthdate:Date,
  friends:[friendSchema],
  userStatus:{type:String,required:true,"default":"disconnect"},
  publications:[publicationSchema],
  url:{type:String},
  coords:{type:[Number],index:'2dsphere'},
  address:String
});
mongoose.model('UserProfile',userProfileSchema);
