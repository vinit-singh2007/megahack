const express=require("express")

const router=express.Router();
const {checkForUser, checkIfUserExist}=require("../controllers/user")
const {checkGetUserUid,redirectIfLoggedIn}=require("../middlewares/user")

router.post("/signup",checkForUser);
router.post("/login",checkIfUserExist);

router.get("/login",redirectIfLoggedIn,(req,res)=>{
    return res.json({success:true})
})
router.get("/",redirectIfLoggedIn,(req,res)=>{
   
   return res.json({success:true})
})

router.get("/signup",redirectIfLoggedIn,(req,res)=>{
   
   return res.json({success:true})
})

router.get("/home",checkGetUserUid,(req,res)=>{
   
    return res.json({success:true})
})
module.exports=router;
