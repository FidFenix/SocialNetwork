var mongoose = require('mongoose');
var Usr = mongoose.model('User');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

var theEarth = (function() {
  var earthRadius = 6371; // km, miles is 3959

  var getDistanceFromRads = function(rads) {
    return parseFloat(rads * earthRadius);
  };

  var getRadsFromDistance = function(distance) {
    return parseFloat(distance / earthRadius);
  };

  return {
    getDistanceFromRads: getDistanceFromRads,
    getRadsFromDistance: getRadsFromDistance
  };
})();

/* GET list of locations */
module.exports.userListByDistance = function(req, res) {
  var lng = parseFloat(req.query.lng);
  var lat = parseFloat(req.query.lat);
  var maxDistance = parseFloat(req.query.maxDistance);
  var point = {
    type: "Point",
    coordinates: [lng, lat]
  };
  var geoOptions = {
    spherical: true,
    maxDistance: theEarth.getRadsFromDistance(maxDistance),
    num: 10
  };
  if ((!lng && lng!==0) || (!lat && lat!==0) || ! maxDistance) {
    console.log('userListByDistance missing params');
    sendJSONresponse(res, 404, {
      "message": "lng, lat and maxDistance query parameters are all required"
    });
    return;
  }
  Usr.geoNear(point, geoOptions, function(err, results, stats) {
    var users;
    console.log('Geo Results', results);
    console.log('Geo stats', stats);
    if (err) {
      console.log('geoNear error:', err);
      sendJSONresponse(res, 404, err);
    } else {
      users = buildUserList(req, res, results, stats);
      sendJSONresponse(res, 200, users);
    }
  });
};

var buildUserList = function(req, res, results, stats) {
  var users = [];
  results.forEach(function(doc) {
    users.push({
      distance: theEarth.getDistanceFromRads(doc.dis),
      fullName: doc.obj.name+" "+doc.obj.firstName+" "+doc.obj.lastName,
      address: doc.obj.address,
      url: doc.obj.url,
      _id: doc.obj._id
    });
  });
  return users;
};

/* GET a location by the id */
module.exports.userProfileFullReadOne = function(req, res) {
  console.log("entrooooo"+req.payload.email);
  console.log('Finding user details', req.payload.email);
  if(req.payload.email){
    Usr
      .findOne({email:req.payload.email})
      //.select("-salt")
      .exec(function(err,user){
        if(!user){
          sendJSONresponse(res, 404, {
            "message": "userid not found"
          });
          return;
        }else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }else if(user._id!=req.payload._id){
          console.log("error en token");
          sendJSONresponse(res, 404, {
            "message": "invalid credentials"
          });
          return;
        }
        else{
          console.log(user);
          sendJSONresponse(res, 200, user);
        }
      });
  }
  else{
    console.log('No userid specified');
    sendJSONresponse(res, 404, {
    "message": "No userid in request"
    });
  }
};

module.exports.userProfilePartialReadOne = function(req, res) {
  console.log('Finding user details', req.params);
  if (req.params && req.params.userid) {
    Usr
      .findById(req.params.userid)
      .select("-hash -salt -friends")
      .exec(function(err, user) {
        if (!user) {
          sendJSONresponse(res, 404, {
            "message": "userid not found"
          });
          return;
        } else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        console.log(user);
        sendJSONresponse(res, 200, user);
      });
  } else {
    console.log('No userid specified');
    sendJSONresponse(res, 404, {
      "message": "No userid in request"
    });
  }
};
/* POST a new location */
/* /api/locations */
/*module.exports.userProfileCreate = function(req, res) {
  Usr.create({
    name: req.body.name,
    firstName: req.body.firstname,
    lastName: req.body.lastname,
    password: req.body.password,
    email: req.body.email,
    birthdate:req.body.birthdate,
    url:req.body.url,
    address: req.body.address,
    coords: [parseFloat(req.body.lng), parseFloat(req.body.lat)],
  }, function(err, user) {
    if (err) {
      console.log(err);
      sendJSONresponse(res, 400, err);
    } else {
      console.log(user);
      sendJSONresponse(res, 201, user);
    }
  });
};*/

/* PUT /api/locations/:locationid */
module.exports.userProfileUpdateOne = function(req, res) {
  console.log("ENTRO a UPDATEONE");
   if(req.payload.email){
    Usr
      .findOne({email:req.payload.email})
      .exec(function(err,user){
        if(!user){
          sendJSONresponse(res, 404, {
            "message": "user not found"
          });
          return;
        }else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }else if(user._id!=req.payload._id){
          console.log("error en token");
          sendJSONresponse(res, 404, {
            "message": "invalid credentials"
          });
          return;
        }
        else{
          user.name=req.body.name,
          //user.setPassword(req.body.password);
          user.email=req.body.email;
          user.birthdate=req.body.birthdate;
          user.address = req.body.address;
          user.job=req.body.job;
          user.userStatus =req.body.userStatus;
          user.profilePhoto=req.body.profilePhoto,
          user.coverPage=req.body.coverPage,
          user.gender=req.body.gender,
          user.url=req.body.url;
          user.save(function(err, user) {
            if (err) {
              sendJSONresponse(res, 404, err);
            } else {
              console.log("User Save successfull");
              sendJSONresponse(res, 200,user);
            }
          });

        }
      });
  }
  else{
    console.log('No userid specified');
    sendJSONresponse(res, 404, {
      "message": "No userid in request"
    });
  }
};

/* DELETE /api/locations/:locationid */
module.exports.userProfileDeleteOne = function(req, res) {
  var userid = req.params.userid;
  if (userid) {
    Loc
      .findByIdAndRemove(userid)
      .exec(
        function(err, user) {
          if (err) {
            console.log(err);
            sendJSONresponse(res, 404, err);
            return;
          }
          console.log("User id " + locationid + " deleted");
          sendJSONresponse(res, 204, null);
        }
    );
  } else {
    sendJSONresponse(res, 404, {
      "message": "No userid"
    });
  }
};
