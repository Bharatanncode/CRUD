const Studentinformation = require('../model/model');
const jwt = require('jsonwebtoken');
const { logger } = require ('../Loggers/Loggers');
require('dotenv').config();

const loginStudentData = async(req,res) =>{
  if (req.body.password && req.body.email) {
    try {
      const user = await Studentinformation.findOne(req.body).select('-password');
      if (user) {
        res.status(200).send({user: "Successfully Logged In"});
      } else {
        return res.status(400).send({ result: 'No user Found' });
      }
    } catch (err) {
      logger.info(`(Shop:) ${req.body}, (Route:) /LoginUser, (File:) controller.js, (Error:) ` + err.message + new Date());
      return res.send({ status: 'error', message: 'Something went wrong, please try again later.', errorMessage: err.message });
    }
  } else {
    return res.status(400).send({ message: "error", result: 'No user Found' });
  }
}

const getStudentData = async(req, res) =>{
  try {
    let getData = await Studentinformation.find();
    if (getData.length > 0) {
      res.status(200).send({ message: "success", GetData: getData });
    } else {
      res.status(400).send({ message: "error", Data: "No Data Found" });
    }
  } catch (err) {
    logger.info(`(Shop:) ${req.body}, (Route:) /GetStudentData, (File:) controller.js, (Error:) ` + err.message + new Date());
    return res.send({ status: 'error', message: 'Something went wrong, please try again later.', errorMessage: err.message });
  }
}

const postStudentData= async(req, res) =>{
  const { name,email,password,about } = req.body;
  try {
    if(!name|| !email || !password || !about){
      return res.status(404).send({ message: "error", message:"Please Enter all the fields"});
    }
    const result = new Studentinformation({
      name: name,
      email:email,
      password:password,
      about:about,
    });
    await result.save();//token code

    jwt.sign({ result }, process.env.jwtkey, { expiresIn: "1h" }, (err, token) => {
      if (err) {
        res.send({ status: "error", message: 'Something went wrong, please try again later.' });
      }
      res.send({ status: "success", UserData: result, auth: token });
    });
  } catch (err) {
    logger.info(`(Shop:) ${req.body}, (Route:) /PostStudentData, (File:) controller.js, (Error:) ` + err + new Date());
    return res.send({ status: 'error', message: 'Something went wrong, please try again later.', errorMessage: err.message });
  }
}

const updateStudentData = async(req, res) =>{
  const { index, uname, uabout } = req.body; //id, name, about
  try {
    if(!index || !uname || !uabout){
      return res.status(404).send({ message: "error", message:"Please Enter all the fields"});
    }
    const data = await Studentinformation.findOneAndUpdate(
      { _id: index },
      {
        $set: {
          name: uname,
          about: uabout
        }
      },
      { new: true }
    );
    if (data) {
      res.status(200).send({ message: "success", Data: "Successfully update Data" });
    } else {
      res.status(404).send({ message: "error", user: "Student not found" });
    }
  } catch (error) {
    logger.info(`(Shop:) ${req.body}, (Route:) /UpdateStudentData, (File:) controller.js, (Error:) ` + error + new Date());
    return res.send({ status: 'error', message: 'Something went wrong, please try again later.', errorMessage: error.message });
  }
}

const deleteStudentData= async(req, res) =>{
  try {
    const id = req.body.id;
    if(!id){
      return res.status(404).send({ message: "error", message:"Please Enter id"});
    }
    const deletedData = await Studentinformation.findOneAndDelete({ _id: id });

    if (deletedData) {
      res.status(200).send({ message: "Successfully Deleted student Data" });
    } else {
      res.status(404).send({ message: "error", user: "Student not found" });
    }
  } catch (error) {
    logger.info(`(Shop:) ${req.body}, (Route:) /DeleteStudentData, (File:) controller.js, (Error:) ` + error + new Date());
    return res.send({ status: 'error', message: 'Something went wrong, please try again later.', errorMessage: error.message });
  }
}

const searchStudentData = async(req, res) =>{
  try {
    const { key } = req.params;
    const result = await Studentinformation.find({
      "$or": [
        { name: { $regex: key } },
        { email: { $regex: key } },
        { password: { $regex: key } },
        { about: { $regex: key } },
      ],
    });
    if (result.length === 0) {
      return res.status(404).send({ message: 'No Data Found' });
    } else {
      return res.status(200).send({ message: 'Success', GetData: result });
    }
  } catch (error) {
    logger.info(`(Shop:)${key}, (Route:) /Search/:key, (File:) controller.js, (Error:) ` + error + new Date());
    return res.send({ status: 'error', message: 'Something went wrong, please try again later.', errorMessage: error.message });
  }
}

module.exports = { 
  loginStudentData,
  getStudentData ,
  postStudentData,
  updateStudentData ,
  deleteStudentData ,
  searchStudentData,

};
