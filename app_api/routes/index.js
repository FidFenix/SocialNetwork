var express = require('express');
var router = express.Router();
var ctrlUsers = require ('../controllers/userprofile');
var ctrlPhotos = require('../controllers/photos');
var ctrlPublications = require('../controllers/publications');
var ctrlComments = require('../controllers/publications');
//userprofile
router.get('/users',ctrlUsers.userListByDistance);
router.post('/users/create',ctrlUsers.userProfileCreate);
router.post('/users/full/:userid',ctrlUsers.userProfileFullReadOne);
router.get('/users/partial/:userid',ctrlUsers.userProfilePartialReadOne);
router.put('/users/update/:userid',ctrlUsers.userProfileUpdateOne);
router.delete('/users/delete/:userid',ctrlUsers.userProfileDeleteOne);
//photos
router.post('/users/:userid/photos',ctrlPhotos.photosCreate);
router.get('/users/:userid/photos/:photoid',ctrlPhotos.photoReadOne);
router.put('/users/:userid/photos/:photoid',ctrlPhotos.photoUpdateOne);
router.delete('/users/:userid/photos/:photoid',ctrlPhotos.photoDeleteOne);
//publication
router.post('/users/:userid/publications',ctrlPublications.publicationCreate);
router.get('/users/:userid/publications/:publicationid',ctrlPublications.publicationReadOne);
router.put('/users/:userid/publications/:publicationid',ctrlPublications.publicationUpdateOne);
router.delete('/users/:userid/publications/:publicationid',ctrlPublications.publicationDeleteOne);
//comment
module.exports=router;
