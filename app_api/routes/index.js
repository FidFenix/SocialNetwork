var express = require('express');
var router = express.Router();
var ctrlUsers = require ('../controllers/userprofile');

//locations
router.get('/users',ctrlUsers.userListByDistance);
router.post('/users',ctrlUsers.userProfileCreate);
router.get('/users/:userid',ctrlUser.userProfileFullReadOne);
router.put('/users/:userid',ctrlUser.userProfileUpdateOne);
router.delete('/users/:userid',ctrlUser.userProfileDeleteOne);
router.get('/users/:userid',ctrlUser.userProfileFullReadOne);

module.exports=router;
