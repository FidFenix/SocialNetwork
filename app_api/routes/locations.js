var express = require('express');
var router = express.Router();
var ctrlLocations = require ('../controllers/locations');
var ctrlReviews = require ('../controllers/review');

//locations
router.get('/locations',ctrllocations.locationsListByDistance);
router.post('/locations',ctrlLocations.locationsCreate);
router.get('/locations/:locationid'ctrlLocations.locationsReadOne);
router.put('/locations/:locationsid',ctrlLocations.locationsUpdateOne);
router.delete('/locations/:locationid',ctrlLocations.locationsDeleteOne);
module.exports=router;
