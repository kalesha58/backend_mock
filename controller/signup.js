const signupUser = require("../models/signupModel");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcrypt");

const signUp = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const userExists = await signupUser.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User Already Exits");
  }
  const user = await signupUser.create({
    email,
    password,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,

      email: user.email,

      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Error Occured");
  }
});
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await signupUser.findOne({ email });
    const hashedPassword = await user.matchPassword(password);
    console.log(hashedPassword)
    if (user && hashedPassword) {
      res.json({
        _id: user._id,

        email: user.email,

        token:generateToken(user._id)
      });
    } else {
      res.status(400);
      throw new Error("Invalid Email or password");
    }
  });
// const login = async (req, res) => {
//   let { email, password } = req.body;
//   const d = await signupUser.find({ email });
//   let hashedPassword =d. password;
//   if (d.length > 0) {
//     try {
//       bcrypt.compare(password, hashedPassword, function (err, resu) {
//         if (resu) {
//           res.send({
//             _id: d._id,

//             email: d.email,

//             token: generateToken(d._id),
//           });
//         }
//       });
//     } catch (error) {
//       res.status(400);
//       throw new Error("Invalid Email or password");
//     }
//   }
// };
module.exports = { signUp, login };
