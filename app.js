require('dotenv').load();
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var uglifyJs = require('uglify-js');
var fs = require('fs');
var passport = require('passport');

require ('./app_api/models/db');
require ('./app_api/config/passport');

var routesApi = require('./app_api/routes/index');

var app = express();

// view engine setup
//app.set('views', path.join(__dirname,'app_server', 'views'));

var appClientFiles = [
  'app_client/app.js',
  'app_client/home/register.controller.js',
  'app_client/common/services/geoLocation.service.js',
  'app_client/common/services/registerUser.service.js',
  'app_client/common/services/authentication.service.js',
  'app_client/common/services/userData.service.js',
  'app_client/common/filters/formatDistance.filter.js',
  'app_client/common/directives/footerGeneric/footerGeneric.directive.js',
  'app_client/common/directives/modal/modal.directive.js',
  'app_client/common/directives/navigation/navigation.directive.js',
  'app_client/common/directives/chat/chat.directive.js',
  'app_client/common/directives/own_profile/pageHeader/pageHeader.directive.js',
  'app_client/common/directives/own_profile/widgets/about/about.directive.js',
  'app_client/common/directives/own_profile/widgets/friends/friends.directive.js',
  'app_client/common/directives/own_profile/widgets/group/group.directive.js',
  'app_client/common/directives/own_profile/timeline/timeline.directive.js',
  'app_client/common/directives/own_profile/timeline/post/post.directive.js',
  'app_client/common/directives/own_profile/timeline/postState/postState.directive.js',
  'app_client/index/index.controller.js',
  'app_client/profiles/own_profile/profile.controller.js',
  'app_client/photos/photos.controller.js',
  'app_client/about/about.controller.js',
  'app_client/userlist/userlist.controller.js',
  'app_client/messages/messages.controller.js',
  'app_client/friends/friends.controller.js',
  'app_client/common/directives/own_profile/widgets/friends/friends.controller.js',
  'app_client/config/editprofile/editprofile.controller.js',
  'app_client/common/directives/own_profile/pageHeader/pageHeader.controller.js',
  'app_client/common/directives/own_profile/timeline/post/post.controller.js',
  'app_client/common/directives/own_profile/timeline/postState/postState.controller.js'
];
var uglified = uglifyJs.minify(appClientFiles,{compress:false});
fs.writeFile('public/angular/socialnetwork.min.js',uglified.code,function(err){
  if(err){
    console.log(err);
  }else{
    console.log("script generated and saved: socialnetwork.min.js");
  }    
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_client')));

app.use(passport.initialize());

//app.use('/', routes);
//app.use('/users', users);
app.use('/api',routesApi);

app.use(function(req,res){
  res.sendFile(path.join(__dirname,'app_client','index.html'));    
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
//catch unauthorized errors
app.use(function(err,req,res,next){
  if(err.name==='UnauthorizedError'){
    res.status(401);
    res.json({"message":err.name+": "+err.message});
  }    
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
