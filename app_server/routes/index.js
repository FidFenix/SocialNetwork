var express = require('express');
var router = express.Router();
var ctrlLocations = require ('../controllers/locations');
var ctrlOthers = require ('../controllers/others');
var ctrlLogin = require ('../controllers/login');

var ctrlForm = require ('../controllers/formcuenta');

/*login page*/
router.get('/login',ctrlLogin.login);
/* Location pages. */
router.get('/',ctrlOthers.angularApp);
router.get('/location',ctrlLocations.locationInfo);
router.get('/location/review/new',ctrlLocations.addReview);

/*Other pages */
router.get('/about',ctrlOthers.about);

router.get('/formcuenta',ctrlForm.formcuenta);

module.exports = router;
