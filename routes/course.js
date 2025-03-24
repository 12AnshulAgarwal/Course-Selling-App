const { Router }=require("express");
const courseRoute=Router();
courseRoute.post("/purchases",function(req,res){
    res.json({
        message:"User has to buy the courses endpoint"
    })
});
courseRoute.get("/enquiry",function(req,res){
    res.json({
        message:"All the list of courses endpoint"
    })
});

module.exports={
    courseRoute:courseRoute
};