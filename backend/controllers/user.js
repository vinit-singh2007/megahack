const User = require("../models/user");
const { setUser } = require("../service/user")
const bcrypt = require("bcrypt");

async function checkForUser(req, res) {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

      
        const token = setUser(user);
        res.cookie("uid", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.json({ success: true });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
}



async function checkIfUserExist(req, res) {
    const { email, password } = req.body;
    try {
        const result = await User.findOne({ email }); 

        if (!result) return res.status(401).json({ success: false });

        const match = await bcrypt.compare(password, result.password); 
        if (!match) return res.status(401).json({ success: false });

        const token = setUser(result);

        res.cookie("uid", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000,
        });
        res.json({ success: true });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
}
module.exports = {
    checkForUser,
    checkIfUserExist,
}