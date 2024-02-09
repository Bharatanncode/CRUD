const express = require('express');
const router = express.Router();
require('dotenv').config();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { logger } = require ('../Loggers/Loggers')

// Function to filter only JPG files
const fileFilter = (req, file, cb) => {
    const allowedFileTypes = /jpeg|jpg/;
    const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedFileTypes.test(file.mimetype);
  
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      return cb(new Error('Only JPG files are allowed!'), false);
    }
}; 

// Configure multer storage and file name   
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `Fileuplode/${req.query.filename}`);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Create multer upload instance
const upload = multer({ storage: storage,
    // fileFilter: fileFilter, // fileFilter only jpg files
    //  limits:{ fileSize: 10 * 1024 * 1024 } // 1-10-MB
    limits: { fileSize: 5 * 1024 * 1024 } // Set the file size limit to 5 MB
});

const uploadMiddleware = (req, res, next) => { //Multipale files uplode thise code
    const createFolders = 'Fileuplode'
    if (!fs.existsSync(createFolders)) {
        fs.mkdirSync(createFolders)
    }
    if (fs.existsSync(`Fileuplode/${req.query.filename}`)) {
        fs.rmSync(`Fileuplode/${req.query.filename}`, { recursive: true });
        fs.mkdirSync("Fileuplode/"+req.query.filename);
    } else {
        fs.mkdirSync("Fileuplode/"+req.query.filename);   
    }
    // Use multer upload instance
    upload.array('files', 5)(req, res, (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      // Proceed to the next middleware or route handler
      next();
    });
}; 

router.post('/uplodeFile',uploadMiddleware,(req, res) => {
    try {
          // Handle the uploaded files
        const files = req.files;
        // console.log("files: ", files);
        // Check if files is defined
        if (!files) {
        return res.status(400).json({ error: 'No files were uploaded.' });
    }
  
        res.status(200).send({status:'success', message: 'File upload successful' });
    } catch (error) {
        logger.info(`(Shop:), (Route:) /uplodeFile, (File:) multerFileUplode.js, (Error:) ` + error + new Date());
        return res.send({ status: 'error', message: 'Something went wrong, please try again later.', errorMessage: error.message });
        
    }
});

module.exports= router;