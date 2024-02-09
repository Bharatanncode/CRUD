const express = require('express');
const router = express.Router();
const studentController = require('./controller');
require('dotenv').config();
const verify = require('../jwt'); //verify Token Function

router.get('/LoginUser',verify ,studentController.loginStudentData);//verify Token

router.post('/PostStudentData', studentController.postStudentData);//Create Token

router.get('/GetStudentData', studentController.getStudentData); //verify Token//Get methodes

router.put('/UpdateStudentData', studentController.updateStudentData);

router.delete('/DeleteStudentData', studentController.deleteStudentData);

router.get('/Search/:key', studentController.searchStudentData);


module.exports = router;