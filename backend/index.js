const express=require("express");
const app=express();
const PORT = process.env.PORT || 3000;
const createRouter=require("./routes/user")
const {connectMongodb}=require("./connection");
const cors = require('cors');
const cookieParser=require("cookie-parser");
require('dotenv').config();

connectMongodb("mongodb://rajputvinitsingh2007_db_user:mysecret123@ac-teczsut-shard-00-00.mis71gs.mongodb.net:27017,ac-teczsut-shard-00-01.mis71gs.mongodb.net:27017,ac-teczsut-shard-00-02.mis71gs.mongodb.net:27017/new1?ssl=true&replicaSet=atlas-9rq3am-shard-0&authSource=admin&appName=cluster0/new1")
.then(()=>{console.log("mongodb connected succesfully")});
app.use(cors()); 
app.use(express.json());
app.use("/user",cookieParser,createRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});