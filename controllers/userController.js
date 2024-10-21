const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signUp = async (req, res) => {
    const { name, email, password } = req.body;

    // Input validation
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword 
        });

        await newUser.save();

        // Respond with success
        res.status(201).json({ message: 'User registered successfully', user: newUser });

    } catch (error) {
        console.error('Error during user registration:', error); // Log the error for debugging
        if (error.code === 11000) {
            // Specific handling for duplicate email
            return res.status(400).json({ message: 'User with this email already exists' });
        }
        res.status(500).json({ message: 'Failed to register user', error: error.message });
    }
};


exports.signIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: existingUser._id }, 'secret_key', { expiresIn: '1h' });
        res.status(200).json({ message: 'User signed in successfully', token });
    } catch (error) {
        res.status(500).json({ message: 'Failed to sign in user', error: error.message });
    }
};