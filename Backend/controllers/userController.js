import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'


//login user

const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide both email and password'
            });
        }

        const user = await userModel.findOne({email});
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        const token = createToken(user._id);
        res.status(200).json({
            success: true,
            token,
            message: 'Login successful',
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred during login',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}


const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

//register user

const registerUser = async (req, res) => {
    const { name, password, email } = req.body;
    try {
        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields'
            });
        }

        // Check if user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.status(409).json({
                success: false,
                message: 'Email already in use'
            });
        }

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: 'Please enter a valid email address'
            });
        }

        // Validate password strength
        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 8 characters long'
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new userModel({
            name: name.trim(),
            email: email.toLowerCase().trim(),
            password: hashedPassword
        });

        const user = await newUser.save();
        const token = createToken(user._id);

        res.status(201).json({
            success: true,
            token,
            message: 'Registration successful',
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred during registration',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

// Get current user
const getCurrentUser = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        console.error('Get current user error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

export { registerUser, loginUser, getCurrentUser }