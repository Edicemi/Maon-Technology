//contoller for user registration and login

//register a user 
const ejs = require("ejs");
const path = require("path");
const User = require("../models/user");
const CustomError = require("../lib/customError");
const { validationResult, body } = require("express-validator");
const { passwordHash, passwordCompare } = require("../lib/bcrypt");
const { jwtSign } = require("../lib/ath");
const { sendMail } = require("../lib/mailer");

exports.register = async (req, res, next) => {
  const { fullname, email, password } = req.body;
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      throw new CustomError().check_input();
    }
    if (fullname && email && password) {
      let userExist = await User.findOne({ email: email });
      if (userExist) {
        throw new CustomError(
          `Email ${email} already exist, try another one.`,
          400
        );
      }
      const hashedPassword = await passwordHash(password);
      const user = new User({
        fullname: fullname,
        email: email,
        password: hashedPassword,
      });

      await ejs.renderFile(
        path.join(__dirname, "../public/email.ejs"),
        {
          title: "Welcome Mail",
          body: `Welcome to StackOverflow ${fullname}, so awesome to have you here.`,
        },
        async (err, data) => {
          await sendMail(data, "Twitee Onboarding mail", email);
        }
      );

      await user.save();
      return res.status(200).json({
        message: "User account created successfully",
        // data: payload,
      });
    } else {
      throw new CustomError().invalid_parameter();
    }
  } catch (error) {
    next(error);
  }
};


//login a user
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user)
      throw {
        message: "User not found",
        code: 400,
      };
    const doMatch = await passwordCompare(password, user.password);
    if (!doMatch)
      throw {
        message: "Invalid Password",
        code: 400,
      };
    let payload = {
      user_id: user._id,
      fullname: user.fullname,
      email: user.email,
    };
    const token = jwtSign(payload);
    return res.status(200).json({
      message: "User logged in successfully",
      data: payload,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(error.code).json({
      message: error.message,
      code: error.code,
    });
  }
};