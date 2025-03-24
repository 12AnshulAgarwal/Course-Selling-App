const express = require("express");
require("dotenv").config(); //dotenv loaded
const mongoose = require("mongoose");
// MongoDB connection string retrieved from environment variables

const MongoUri = process.env.MONGO_URI;
const { userRoute } = require("./routes/user");
const { adminRouter } = require("./routes/admin");
const app = express();
app.use(express.json());
app.use("/user", userRoute);
app.use("/admin", adminRouter);

async function main() {
  try {
    await mongoose.connect(MongoUri);
    console.log("database connected");
    app.listen(3000);
  } catch (err) {
    console.log("conection failed");
  }
}
main();
