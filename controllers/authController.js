// controllers/authController.js

const User = require('../models/user');



exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Successful login
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.register = async (req, res) => {
  try {
    // Extract username and password from the request body
    const { username, password } = req.body;

    // Create a new user record in the database
    const newUser = await User.create({
      username: username,
      password: password
    });

    // Respond with a success message and the newly created user object
    res.status(201).json({
      message: 'User registered successfully',
      user: newUser
    });
  } catch (error) {
    // Handle any errors that occur during user creation
    console.error('Error registering user:', error);
    res.status(500).json({
      message: 'An error occurred while registering user'
    });
  }
};
