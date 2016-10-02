/* location home  page*/
module.exports.homeList = function(req,res){
  res.render('index',{title: 'Home'});
};
/*location info*/
module.exports.locationInfo=function(req,res){
  res.render('index',{title: 'Location Info'});
};

/*location review*/
module.exports.addReview = function(req,res){
  res.render('index',{title: 'Add Review'});
};

