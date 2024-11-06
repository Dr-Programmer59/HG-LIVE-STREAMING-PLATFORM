import catchAsyncError from '../middlewares/catchAsyncError.js';
import adsModel from '../models/ads.js';
import getDataUri from '../utils/dataUri.js';
import fs from 'fs';

import path, {dirname} from 'path';
import {fileURLToPath} from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url))

export const createAds = catchAsyncError(async (req, res) => {
    const {title,description} = req.body;

    if(!title, !description, !req.file){
		return sendResponse(false, 401, 'All fields are required',res);
	}


    let banner;
    if(req.file){
		const base64 = getDataUri(req.file);
		const filename = `${new Date(Date.now()).getTime()}-${req.file.originalname}${base64.fileName}`
	    fs.writeFileSync(path.join(__dirname,`../public/upload/images/${filename}`),base64.buffer,'binary');
		banner = `/upload/images/${filename}`;
	}

    const ads = await adsModel.create({
        title,
        description,
        banner
	});

    res.status(201).json({
        success: true,
        message: 'Ads add successfully'
    })

});

export const getAds = catchAsyncError(async (req, res) => {

    const ads = await adsModel.find();

    res.status(201).json({
        success: true,
        ads
    })

});