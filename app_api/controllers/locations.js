
var mongoose = require('mongoose');
var Loc = mongoose.model('Location');
var sendJsonResponse= function(res,status,content){
  res.status(status);
  res.json(content);
};
module.exports.locationsCreate = function(req,res){
  if(req.params && req.params.locationid){
  Loc
    .findById(req.params.locationid)
    .exec(function(err,location){
        if(!location){
          sendJsonResponse(res,404,{"message":"locationid not found."});
          return;
        }
        else{
          if(err){
            senJsonResponse(res,404,err);
            return;
          }
        }
      sendJsonResponse(res,200,location);    
    });
  }
  else{
    sendJsonResponse(res,404,{"message":"no locationid in the request"});
  }
};
