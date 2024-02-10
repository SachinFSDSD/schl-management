const User = require("../model/user.model");
const convertUser = require("../utils/convertUser");

exports.findAll = async (req, res) => {
  try {
    let users = await User.find();

    if (users) {
      return res.status(200).send(convertUser.userResponse(users));
    }
  } catch (err) {
    return res.status(500).send({
      message: "Some internal error occured" + err,
    });
  }
};

exports.findById = async (req, res) => {
  const userIdReq = req.params.userId;

  const user = await Student.find({
    userId: userIdReq,
  });

  if (user.length > 0) {
    return res.status(200).send(convertUser.userResponse(user));
  } else {
    return res.status(501).send({
      message: `User with id ${userIdReq} is not found`,
    });
  }
};

exports.update = async (req, res) => {
  const userIdReq = req.params.userId;

  try {
    const user = await User.findOneAndUpdate(
      { userId: userIdReq },
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dateOfBirth: req.body.dateOfBirth,
      }
    ).exec();

    if (user) {
      return res.status(200).send({
        message: "User updated successfully",
      });
    }
  } catch (error) {
    return res.status(500).send({
      message: "Some internal server error occured" + error.message,
    });
  }
};
