import express from 'express';
import {changePassword, loadme, login, logout, register, updateUser,forgotPassword,resetPassword, checkOTP} from './controllers/user.js';
import { isAuthenticate, isCheckRole } from './middlewares/auth.js';
import singleUpload from './middlewares/multer.js';
import { createStream, getGraphData, getLiveStream, getStreamDetails, updateStream } from './controllers/streams.js';
import { sendCoin } from './controllers/coins.js';
import { getAllChannels, getSingleChannels, prayRequest } from './controllers/other.js';
import { createAds, getAds } from './controllers/ads.js';

const router = express.Router();

// users routes
router.route('/register').post(singleUpload, register);
router.route('/login').post(login);
router.route('/me').get(isAuthenticate,loadme);
router.route('/logout').get(logout);
router.route('/user/update').put(isAuthenticate,singleUpload,updateUser);
router.route('/user/change-password').put(isAuthenticate,changePassword);
router.route('/forgot-password').post(forgotPassword);
router.route('/reset-password/:token').put(resetPassword);
router.route('/channels').get(getAllChannels);
router.route('/channels/:_id').get(getSingleChannels);
router.route('/pray-request').post(isAuthenticate, prayRequest);
router.route('/verify-otp').post(checkOTP);



// streams routes 
router.route('/stream-create').post(isAuthenticate,singleUpload,createStream);
router.route('/stream-update/:id').put(isAuthenticate,updateStream);
router.route('/streams/:id').get(isAuthenticate,getStreamDetails);
router.route('/streams').get(getLiveStream);
router.route('/views-graph').get(isAuthenticate,getGraphData);


// coins 
router.route('/send-coins').post(isAuthenticate,sendCoin);



// ads
router.route('/create/ads').post(isAuthenticate,isCheckRole('admin'),singleUpload,createAds);
router.route('/create/get').get(getAds);



export default router;