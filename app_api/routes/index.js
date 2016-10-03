var express = require('express');
var router = express.Router();
var ctrlLocations = require ('../controllers/locations');

//locations
//router.get('/locations',ctrlLocations.locationsListByDistance);
router.get('/locations/:locationid',ctrlLocations.locationsCreate);
/*router.get('/locations/:locationid',ctrlLocations.locationsReadOne);
router.put('/locations/:locationsid',ctrlLocations.locationsUpdateOne);
router.delete('/locations/:locationid',ctrlLocations.locationsDeleteOne);*/
module.exports=router;
