const express=require("express");
const app=express();
const PORT = process.env.PORT || 3000;
const createRouter=require("./routes/user")
const {connectMongodb}=require("./connection");
const cors = require('cors');
const cookieParser=require("cookie-parser");
require('dotenv').config();

connectMongodb("mongodb:url")
.then(()=>{console.log("mongodb connected succesfully")});
app.use(cors()); 
app.use(express.json());
app.use("/user",cookieParser,createRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});