// modules =================================================
var express         = require('express'),    
    mongoose        = require('mongoose');


// Node Environment Configuration ===========================================
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development',
    config = require('./server/config/config')[env];


// Create an Instance of Express ===========================================
var app            = express();


// Modules of app ===========================================
require('./server/config/express.js')(app, config); // Express Configuration
require('./server/config/mongoose.js')(config);     // Database Configuration
require('./server/config/routes.js')(app);          // Routes Configuration
require('./server/config/passport.js')();           // Passsport Configuration


// Databse Connection ==================================================
mongoose.connect(config.db);
var db = mongoose.connection;


// start app ===============================================
app.listen(config.port);    
console.log('listening on port ' + config.port);        // shoutout to the user
exports = module.exports = app;                         // expose app
