var mongoose = require('mongoose');
var Usr = mongoose.model('UserProfile');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

/* POST a new review, providing a locationid */
/* /api/locations/:locationid/reviews */
module.exports.commentPublicationCreate = function(req, res) {
  if (req.params.userid) {
    Usr
      .findById(req.params.userid)
      .select('publications')
      .exec(
        function(err, user) {
          if (err) {
            sendJSONresponse(res, 400, err);
          } else if(user.password!=req.body.password){
            sendJSONresponse(res.404,{
              "message":"wrong credentials"  
            });
          } else{
            doAddPublicationComment(req, res, user);
          }
        }
    );
  } else {
    sendJSONresponse(res, 404, {
      "message": "Not found, userid required"
    });
  }
};


var doAddPublicationComment = function(req, res, user) {
  if (!user) {
    sendJSONresponse(res, 404, "userid not found");
  } else {
    var publication = user.publications.id(req.body.publicationid);
    if(!publication){
      sendJSONresponse(res, 404, {
        "message": "publicationid Not found"
      });
      return;
    }
    publication.comments.push({
      userId : req.body.userid,
      text : req.body.text
    });
    user.save(function(err, user) {
      var thisComment;
      if (err) {
        sendJSONresponse(res, 400, err);
      } else {
        thisComment = publication.comments[publication.comments.length - 1];
        sendJSONresponse(res, 201, thisComment);
      }
    });
  }
};

module.exports.publicationCommentUpdateOne = function(req, res) {
  if (!req.params.userid || !req.params.publicationid || !req.params.commentid) {
    sendJSONresponse(res, 404, {
      "message": "Not found, userid,publicationid and commentid are required"
    });
    return;
  }
  Usr
    .findById(req.params.userid)
    .select('password')
    .exec(
      function(err, user) {
        var thisPublication;
        if (!user) {
          sendJSONresponse(res, 404, {
            "message": "userid not found"
          });
          return;
        } else if (err) {
          sendJSONresponse(res, 400, err);
          return;
        } else if(user.password != req.body.password){
          sendJSONresponse(res.404,{
            "message":"wrong credentials"  
          });
          return;
        }
        if (user.publications && user.publications.length > 0) {
          thisPublication = user.publications.id(req.params.publicationid);
          if (!thisPublication) {
            sendJSONresponse(res, 404, {
              "message": "publicationid not found"
            });
          } else {
            thisPublication.title = req.body.title;
            thisPublication.text = req.body.text;
            user.save(function(err, user) {
              if (err) {
                sendJSONresponse(res, 404, err);
              } else {
                sendJSONresponse(res, 200, thisPublication);
              }
            });
          }
        } else {
          sendJSONresponse(res, 404, {
            "message": "No publication to update"
          });
        }
      }
  );
};

module.exports.publicationReadOne = function(req, res) {
  console.log("Getting single publication");
  if (req.params && req.params.userid && req.params.photoid) {
    Loc
      .findById(req.params.userid)
      .select('name firstName lastName publications')
      .exec(
        function(err, user) {
          console.log(user);
          var response, publication;
          if (!user) {
            sendJSONresponse(res, 404, {
              "message": "userid not found"
            });
            return;
          } else if (err) {
            sendJSONresponse(res, 400, err);
            return;
          }
          if (user.publications && user.publications.length > 0) {
            publication = user.publications.id(req.params.publicationid);
            if (!publication) {
              sendJSONresponse(res, 404, {
                "message": "publicationid not found"
              });
            } else {
              response = {
                user: {
                  name: user.name,
                  firstname:user.firstName,
                  lastname:user.lastName,
                  id: req.params.userid
                },
                publication: publication
              };
              sendJSONresponse(res, 200, response);
            }
          } else {
            sendJSONresponse(res, 404, {
              "message": "No publication found"
            });
          }
        }
    );
  } else {
    sendJSONresponse(res, 404, {
      "message": "Not found, userid and publicationid are both required"
    });
  }
};

// app.delete('/api/locations/:locationid/reviews/:reviewid'
module.exports.publicationDeleteOne = function(req, res) {
  if (!req.params.userid || !req.params.publicationid) {
    sendJSONresponse(res, 404, {
      "message": "Not found, userid and publicationid are both required"
    });
    return;
  }
  Usr
    .findById(req.params.userid)
    .select('publications password')
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
        if (user.publications && user.publications.length > 0) {
          if (!user.publications.id(req.params.publicationid)) {
            sendJSONresponse(res, 404, {
              "message": "publicationid not found"
            });
          } else {
            user.publications.id(req.params.publicationid).remove();
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
            "message": "No publication to delete"
          });
        }
      }
  );
};
