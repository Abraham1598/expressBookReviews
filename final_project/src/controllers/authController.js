const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

let users = [];


const register = async (req, res) => {

    const { username, password } = req.body;

    if (!username || !password) {

        return res.status(400).json({
            success: false,
            message: "Username and password are required"
        });
    }

    const existingUser = users.find(
        (user) => user.username === username
    );

    if (existingUser) {

        return res.status(400).json({
            success: false,
            message: "User already exists"
        });
    }

    try {

        const hashedPassword = await bcrypt.hash(password, 10);

        users.push({
            username,
            password: hashedPassword
        });

        return res.status(201).json({
            success: true,
            message: "User registered successfully"
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Error registering user"
        });
    }
};


const login = async (req, res) => {

    const { username, password } = req.body;

    if (!username || !password) {

        return res.status(400).json({
            success: false,
            message: "Username and password are required"
        });
    }

    const user = users.find(
        (user) => user.username === username
    );

    if (!user) {

        return res.status(401).json({
            success: false,
            message: "Invalid credentials"
        });
    }

    const validPassword = await bcrypt.compare(
        password,
        user.password
    );

    if (!validPassword) {

        return res.status(401).json({
            success: false,
            message: "Invalid credentials"
        });
    }

    const token = jwt.sign(
        { username },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    return res.status(200).json({
        success: true,
        message: "Login successful",
        token
    });
};


module.exports = {
    register,
    login
};