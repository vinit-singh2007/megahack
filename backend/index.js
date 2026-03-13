require('dotenv').config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const createRouter = require("./routes/user")
const { connectMongodb } = require("./connection");
const cors = require('cors');
const cookieParser = require("cookie-parser");


app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

connectMongodb(process.env.URL)
    .then(() => { console.log("mongodb connected succesfully") });
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
}));
app.use( cookieParser())
app.use(express.json());
app.use("/user", createRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});