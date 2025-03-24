const { Schema, default: mongoose, Types } = require ("mongoose");
console.log("Mongo Connected");
const ObjectId=mongoose.Types.ObjectId;
const Users=new Schema({
    email:{type:String},
    password:String,
    firstname:String,
    lastname:String,
})

const Admin=new Schema({
    email:{type:String,unique:true},
    password:String,
    firstname:String,
    lastname:String,
})

const Course=new Schema({
    title:String,
    description:String,
    price:Number,
    imageURL:String,
    creatorID:ObjectId
})

const Purchases=new Schema({
    courseId:ObjectId,
    userId:ObjectId
})

const userModel=mongoose.model("user",Users);
const AdminModel=mongoose.model("admin",Admin);
const CourseModel=mongoose.model("course",Course);
const PurchaseModel=mongoose.model("purchase",Purchases);

module.exports={
    userModel,
    AdminModel,
    CourseModel,
    PurchaseModel
}
