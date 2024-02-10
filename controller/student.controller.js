const User = require("../model/user.model");
const constant = require("../utils/constants");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signUp = async (req, res) => {
  try {
    const createStudent = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userId: req.body.userId,
      password: bcrypt.hashSync(req.body.password, 8),
      dateOfBirth: req.body.dateOfBirth,
      userType: req.body.userType,
    });

    const response = {
      firstName: createStudent.firstName,
      lastName: createStudent.lastName,
      userId: createStudent.userId,
      password: createStudent.password,
      dateOfBirth: createStudent.dateOfBirth,
      userType: createStudent.userType,
      createdAt: createStudent.createdAt,
      updatedAt: createStudent.updatedAt,
    };

    return res.status(200).send(response);
  } catch (error) {
    console.log("error while creating user" + error.message);
    res.status(500).send({
      message: "Some internal error occured while creating user",
    });
  }
};

exports.signIn = async (req, res) => {
  const studenId = await User.findOne({ userId: req.body.userId });

  if (!studenId) {
    res.status(400).send({
      message: "Failed! user Id does not exit",
    });
    return;
  }

  const isPassword = bcrypt.compareSync(req.body.password, studenId.password);

  if (!isPassword) {
    return res.status(401).send({
      message: "Password provided is invalid",
    });
  }

  return res.status(200).send({
    firstName: studenId.firstName,
    lastName: studenId.lastName,
    userId: studenId.userId,
    dateOfBirth: studenId.dateOfBirth,
    userType: studenId.userType,
  });
};
