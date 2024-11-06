import catchAsyncError from '../middlewares/catchAsyncError.js';
import StreamModel from '../models/streams.js'; 
import path, {dirname} from 'path';
import {fileURLToPath} from 'url';
import getDataUri from '../utils/dataUri.js';
const __dirname = dirname(fileURLToPath(import.meta.url))
import fs from 'fs'
import user from '../models/user.js';

export const createStream = catchAsyncError(async (req, res) => {
    
	const {title,thumnail} = req.body;
    let thumnailpath;
    if(thumnail){
        const filterData = thumnail.substr(thumnail.indexOf(',')+1);
		const buffer = new Buffer(filterData,'base64');
        const filename = `${new Date(Date.now()).getTime()}.png`
	    fs.writeFileSync(path.join(__dirname,`../public/upload/images/${filename}`),buffer,'binary');
		thumnailpath = `/upload/images/${filename}`;
    }
    console.log(thumnailpath)

    if(!title || !req.file) return res.status(401).json({success: false,message: "all fields are required"});
    
    
		const base64 = getDataUri(req.file);
		const filename = `${new Date(Date.now()).getTime()}-${req.file.originalname}${base64.fileName}`
	    fs.writeFileSync(path.join(__dirname,`../public/upload/images/${filename}`),base64.buffer,'binary');
		let banner = `/upload/images/${filename}`;

    const stream = await StreamModel.create({title,owner: req.user._id,banner,thumnail: thumnailpath});
    
    res.status(200).json({
        success: true,
        roomId: stream._id
    })
	
});

export const updateStream = catchAsyncError(async (req, res) => {
	const {id} = req.params;

    const stream = await StreamModel.findByIdAndUpdate(id,{...req.body});

    res.status(200).json({
        success: true,
        message: "update successfully"
    })
	
});

export const getLiveStream = catchAsyncError(async (req, res) => {

    const streams = await StreamModel.find({status: "processing"});

    res.status(200).json({
        success: true,
        streams
    })
	
});


export const getStreamDetails = catchAsyncError(async (req, res) => {
	const {id} = req.params;

    const stream = await StreamModel.findById(id).populate('owner');

    res.status(200).json({
        success: true,
        stream
    })
	
});

function formatData(streamData, filterType) {
    const data = {
      labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      datasets: [{
        label: 'Listeners',
        data: [], // This will be populated with views data for each day
        borderColor: '#FF7F0B'
      }]
    };
  
    // Function to get the day of the week from a date string
    function getDayOfWeek(dateString) {
      const date = new Date(dateString);
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      return days[date.getDay()];
    }
  
    // Filter function based on filterType
    function filterDataByType(data, filterType) {
      const currentDate = new Date();
      switch (filterType) {
        case 'lastWeek':
          return data.filter(entry => new Date(entry.createdAt) >= new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 7));
        case 'lastMonth':
          return data.filter(entry => new Date(entry.createdAt) >= new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate()));
        case 'lastYear':
          return data.filter(entry => new Date(entry.createdAt) >= new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), currentDate.getDate()));
        default:
          return data;
      }
    }
  
    // Filter data based on filterType
    const filteredData = filterDataByType(streamData, filterType);
  
    // Populate the data array with views data for each day of the week
    data.labels.forEach(day => {
      const viewsOnDay = filteredData.find(entry => getDayOfWeek(entry.createdAt) === day);
      if (viewsOnDay) {
        data.datasets[0].data.push(viewsOnDay.views);
      } else {
        data.datasets[0].data.push(0);
      }
    });
  
    return data;
  }

  export const getGraphData = catchAsyncError(async (req, res) => {
	const {time} = req.query;

    let streams = await StreamModel.find();
    streams = streams.filter(data => data.owner._id.toString() === req.user._id.toString());
    const data = formatData(streams,time)

    res.status(200).json({
        success: true,
        data
    })
	
});
