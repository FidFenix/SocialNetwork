var mongoose = require ('mongoose');
var photoSchema = new mongoose.Schema({
    data :{type:Buffer},
    uploadDate: {type:Date,"default":Date.now},
    tags:[String] 
});
var likeTypeSchema = new mongoose.Schema({
    likeTypeIndex : Number,
    likeTypeName : String
});
var likeSchema= new mongoose.Schema({
    likeUser : {type:mongoose.Schema.Types.ObjectId,required:true},
    likeType : likeTypeSchema
});
var commentSchema = new mongoose.Schema({
    commentDate : {type:Date,"default":Date.now},
    commentText : {type:String,required:true},
    commentLikes : [likeSchema],
    
})
var publicationSchema= new mongoose.Schema({
    publicationDate :{type:Date,"default":Date.now},
    publicationText : String,
    publicationPhoto:[photoSchema],
    publicationComments:[commentSchema],

});
var userSchema= new mongoose.Schema({
    userFirstName :{type:String,required:true},
    userLastName:{type:String,required:true},
    adress:String,
    phoneNumber:Number,
    email:{type:String,required:true},
    userPgotos: [photoSchema],
    userBirthdate:Date,
    userContacts:[mongoose.Schema.Types.ObjectId],
    userPerfil:[]
  
});

var locationSchema = new mongoose.Schema({
    name:{type:String,required:true},
    adress:String,
    rating:{type: Number,"default": 0,min: 0,max: 5},
    facilities:[String],
    coord:{type:[Number],index:'2dsphere'}
});
mongoose.model('User',userSchema);

