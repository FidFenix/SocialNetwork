var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload'
});
var ctrlUsers = require ('../controllers/userprofile');
var ctrlPhotos = require('../controllers/photos');
var ctrlPublications = require('../controllers/publications');
var ctrlComments = require('../controllers/publications');
var ctrlAuth = require('../controllers/authentication');

//authentication
router.post('/register',ctrlAuth.register);
router.post('/login',ctrlAuth.login);
//userprofile
router.get('/users',ctrlUsers.userReadAll);
//router.get('/users',ctrlUsers.userListByDistance);
//router.post('/users/create',ctrlUsers.userProfileCreate);
router.post('/users/full',auth,ctrlUsers.userProfileFullReadOne);
router.get('/users/partial/:userid',ctrlUsers.userProfilePartialReadOne);
router.post('/users/update',auth,ctrlUsers.userProfileUpdateOne);
router.delete('/users/delete/:userid',ctrlUsers.userProfileDeleteOne);
//friends
router.post('/users/friend',auth,ctrlUsers.userAddFriend);

//photos
router.post('/users/photos',ctrlPhotos.photosCreate);
router.get('/users/photos/:photoid',ctrlPhotos.photoReadOne);
router.put('/users/photos/:photoid',ctrlPhotos.photoUpdateOne);
router.delete('/users/photos/:photoid',ctrlPhotos.photoDeleteOne);
//publication
router.post('/users/:userid/publications',ctrlPublications.publicationCreate);
router.get('/users/:userid/publications/:publicationid',ctrlPublications.publicationReadOne);
router.put('/users/:userid/publications/:publicationid',ctrlPublications.publicationUpdateOne);
router.delete('/users/:userid/publications/:publicationid',ctrlPublications.publicationDeleteOne);
//comment
module.exports=router;
