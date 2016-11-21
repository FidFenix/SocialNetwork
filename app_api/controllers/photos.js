var mongoose = require('mongoose');
var Usr = mongoose.model('UserProfile');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

/* POST a new review, providing a locationid */
/* /api/locations/:locationid/reviews */
module.exports.photosCreate = function(req, res) {
  if (req.params.userid) {
    Loc
      .findById(req.params.userid)
      .select('photos')
      .exec(
        function(err, user) {
          if (err) {
            sendJSONresponse(res, 400, err);
          } else if(user.password!=req.body.password){
            sendJSONresponse(res,404,{
              "message":"wrong credentials"  
            });
          } else{
            doAddPhotos(req, res, user);
          }
        }
    );
  } else {
    sendJSONresponse(res, 404, {
      "message": "Not found, userid required"
    });
  }
};


var doAddPhotos = function(req, res, user) {
  if (!user) {
    sendJSONresponse(res, 404, "locationid not found");
  } else {
    user.photos.push({
      data: req.body.data,
      tags: req.body.tags.split(','),
      coords: [parseFloat(req.body.lng),parseFloat(req.body.lat)],
      text: req.body.text
    });
    user.save(function(err, user) {
      var thisPhoto;
      if (err) {
        sendJSONresponse(res, 400, err);
      } else {
        thisPhoto = user.photos[user.photos.length - 1];
        sendJSONresponse(res, 201, thisPhoto);
      }
    });
  }
};

module.exports.photoUpdateOne = function(req, res) {
  if (!req.params.userid || !req.params.photoid) {
    sendJSONresponse(res, 404, {
      "message": "Not found, userid and photoid are both required"
    });
    return;
  }
  Usr
    .findById(req.params.userid)
    .select('photos')
    .exec(
      function(err, user) {
        var thisPhoto;
        if (!user) {
          sendJSONresponse(res, 404, {
            "message": "userid not found"
          });
          return;
        } else if (err) {
          sendJSONresponse(res, 400, err);
          return;
        } else if(user.password != req.body.password){
          sendJSONresponse(res,404,{
            "message":"wrong credentials"  
          });
          return;
        }
        if (user.photos && user.photos.length > 0) {
          thisPhoto = user.photos.id(req.params.photoid);
          if (!thisPhoto) {
            sendJSONresponse(res, 404, {
              "message": "userid not found"
            });
          } else {
            thisPhoto.text = req.body.text;
            thisPhoto.tags = req.body.tags.split(',');
            user.save(function(err, user) {
              if (err) {
                sendJSONresponse(res, 404, err);
              } else {
                sendJSONresponse(res, 200, thisPhoto);
              }
            });
          }
        } else {
          sendJSONresponse(res, 404, {
            "message": "No photo to update"
          });
        }
      }
  );
};

module.exports.photoReadOne = function(req, res) {
  console.log("Getting single photo");
  if (req.params && req.params.userid && req.params.photoid) {
    Usr
      .findById(req.params.userid)
      .select('name firstName lastName photos')
      .exec(
        function(err, user) {
          console.log(user);
          var response, photo;
          if (!user) {
            sendJSONresponse(res, 404, {
              "message": "userid not found"
            });
            return;
          } else if (err) {
            sendJSONresponse(res, 400, err);
            return;
          }
          if (user.photos && user.photos.length > 0) {
            photo = user.photos.id(req.params.photoid);
            if (!photo) {
              sendJSONresponse(res, 404, {
                "message": "photoid not found"
              });
            } else {
              response = {
                user: {
                  name: user.name,
                  firstname:user.firstName,
                  lastname:user.lastName,
                  id: req.params.userid
                },
                photo: photo
              };
              sendJSONresponse(res, 200, response);
            }
          } else {
            sendJSONresponse(res, 404, {
              "message": "No photos found"
            });
          }
        }
    );
  } else {
    sendJSONresponse(res, 404, {
      "message": "Not found, userid and photoid are both required"
    });
  }
};

// app.delete('/api/locations/:locationid/reviews/:reviewid'
module.exports.photoDeleteOne = function(req, res) {
  if (!req.params.userid || !req.params.photoid) {
    sendJSONresponse(res, 404, {
      "message": "Not found, userid and photoid are both required"
    });
    return;
  }
  Usr
    .findById(req.params.userid)
    .select('photos password')
    .exec(
      function(err, user) {
        if (!user) {
          sendJSONresponse(res, 404, {
            "message": "userid not found"
          });
          return;
        } else if (err) {
          sendJSONresponse(res, 400, err);
          return;
        } else if(user.password != req.body.password){
          sendJSONresponse(res,404,{
            "message":"wrong credentials"  
          });
          return;
        }
        if (user.photos && user.photos.length > 0) {
          if (!user.photos.id(req.params.photoid)) {
            sendJSONresponse(res, 404, {
              "message": "photoid not found"
            });
          } else {
            user.photos.id(req.params.photoid).remove();
            user.save(function(err) {
              if (err) {
                sendJSONresponse(res, 404, err);
              } else {
                sendJSONresponse(res, 204, null);
              }
            });
          }
        } else {
          sendJSONresponse(res, 404, {
            "message": "No photo to delete"
          });
        }
      }
  );
};
