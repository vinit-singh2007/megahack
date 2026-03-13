const User=require("../models/user");
const {setUser}=require("../service/user")

async function checkForUser(req,res){
    const {name,email,password}=req.body;
    await User.create({
        name,
        email,
        password,
    })
    res.json({success:true})
}

async function checkIfUserExist(req,res){
    const {email,password}=req.body;
    const result=await User.findOne({
        email,
        password,
    })

    if (!result) return res.json({success:false})
    const token=setUser(result);
    
    res.cookie("uid",token)
    res.json({success:true})
}

module.exports={
    checkForUser,
    checkIfUserExist,
}