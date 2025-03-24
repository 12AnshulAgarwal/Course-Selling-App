const zod = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Router } = require("express");
const adminRouter = Router();
const { AdminModel, CourseModel } = require("../db");
const { adminMiddleware } = require("../middleware/admin");
require("dotenv").config();

const signupSchema = zod.object({
  email: zod.string().email(), //for email validation
  password: zod.string().min(8),
  firstname: zod.string().min(2),
  lastname: zod.string().min(2),
});

adminRouter.post("/signup", async function (req, res) {
  try {
    const { email, password, firstname, lastname } = signupSchema.parse(
      req.body
    );
    const hashedPassword = await bcrypt.hash(password, 5);
    await AdminModel.create({
      email: email,
      password: hashedPassword,
      firstname: firstname,
      lastname: lastname,
    });
    res.json({ message: "Signup Successful" });
  } catch (err) {
    res.json(err);
  }
});

adminRouter.post("/signin", async function (req, res) {
  try {
    const { email, password } = req.body;
    const admin = await AdminModel.findOne({
      email: email,
    });
    if (admin) {
      const decode = await bcrypt.compare(password, admin.password);
      if (decode) {
        const token = jwt.sign(
          {
            id: admin._id,
          },
          process.env.adminjwt_password
        );
        res.json({
          token: token,
        });
      }
    } else {
      res.json({
        message: "invalid token",
      });
    }
  } catch (err) {
    res.json({
      message: "sign in failed",
    });
  }
});

adminRouter.post("/add", adminMiddleware, async function (req, res) {
  try {
    const { title, description, imageURL, price } = req.body;
    const adminid = req.adminid;

    const course = await CourseModel.create({
      title: title,
      description: description,
      imageURL: imageURL, // Fixed field name
      price: price,
      creatorID: adminid,
    });

    res.json({
      message: "Admin has successfully added a new course",
      courseid: course._id, // Optional: Send the created course as a response
    });
  } catch (err) {
    res.status(500).json({
      message: err.message, // Proper error message
    });
    console.log(err);
  }
});

adminRouter.put("/edit", adminMiddleware, async function (req, res) {
  try {
    const { title, description, imageURL, price, courseID } = req.body;
    const adminid = req.adminid;
    const course = await CourseModel.findOneAndUpdate(
      {
        _id: courseID, //filter in the basis of course id
        creatorID: adminid, //filter to check if creater exist
      },
      {
        title: title,
        description: description,
        imageURL: imageURL,
        price: price,
      }
    );
    res.json({
      message: "course has been updated successfully",
      courseID: course._id,
    });
    console.log(course);
  } 
  catch (err) {
    res.json({
      message: "unauthorised user",
    });
  }
});

adminRouter.get("/review", adminMiddleware, async function (req, res) {
  const adminid = req.adminid;
  const courses=await CourseModel.find({
    creatorID: adminid
  })
res.json({
    message:"Courses are shown below",
    courses:courses
})
});
module.exports = {
  adminRouter,
};
