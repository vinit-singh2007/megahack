const {getUser}=require("../service/user");


async function checkGetUserUid(req,res,next){
    const userId=req.cookies?.uid;
    if(!userId) return res.json({success:false});

    const user=getUser(userId);
    if(!user) return res.json({success:false});

    req.user=user;
    next();
}

async function redirectIfLoggedIn(req,res,next){
    const userId=req.cookies?.uid;
    if(userId) return res.json({success:false});
    return next();
}
module.exports={
    checkGetUserUid,
    redirectIfLoggedIn,
}
