const zod = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Router } = require("express");
const userRoute = Router();
const { userModel, CourseModel, PurchaseModel } = require("../db");
const { userMiddleware } = require("../middleware/user");
const userwebtoken = process.env.userjwt_password;

const signupSchema = zod.object({
  email: zod.string().email(), //for email validation
  password: zod.string().min(8),
  firstname: zod.string().min(2),
  lastname: zod.string().min(2),
});

userRoute.post("/signup", async function (req, res) {
  try {
    const { email, password, firstname, lastname } = signupSchema.parse(
      req.body
    );
    const hashedPassword = await bcrypt.hash(password, 5); //(your password,salt)
    await userModel.create({
      email: email,
      password: hashedPassword,
      firstname: firstname,
      lastname: lastname,
    });
    res.json({
      message: "User has succesfully signup",
    });
  } catch (err) {
    res.json(err);
  }
});

userRoute.post("/signin", async function (req, res) {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({
      email: email
    });
    if (user) {
      const decode = await bcrypt.compare(password, user.password);
      if (decode) {
        const token = jwt.sign(
          {
            id: user._id,
          },
          userwebtoken
        );
        res.json({
          token: token,
        });
      } else {
        res.json({
          message: "incorrect password",
        });
      }
    }
  } catch (err) {
    res.json({
      message: "incorrect user"
    });
  }
});

userRoute.post("/purchase", userMiddleware, function (req, res) {
  try {
    const userid = req.userid;
    const courseId = req.body.userid;
    const courses = PurchaseModel.create({
      courseId: courseId,
      userId: userid,
    });
    res.json({
      message: "course purchased successfully",
    });
  } catch (err) {
    res.json({
      message: "failed to purchase the course",
    });
  }
});

userRoute.get("/enquiry", async function (req, res) {
  try {
    const courses = await CourseModel.find({});
    res.json({
      courses,
    });
  } catch (err) {
    res.json({
      message: err,
    });
  }
});

userRoute.get("/purchases", userMiddleware, function (req, res) {
  res.json({
    message: "User has list of purchased courses endpoint",
  });
});

module.exports = {
  userRoute,
};
