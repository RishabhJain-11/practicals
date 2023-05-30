const express = require('express');
const bcrypt = require('bcryptjs');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Dummy user data
const users = [
    {
        id: 1,
        username: 'john',
        password: '$2a$10$Y/3ZzyEN.e2j7LST8zT0jOnbToRvjJ2hkPd6VZLcJF1FZBv0ZT1dG', // Hashed password: 'password'
    },
];

// Register a new user
app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if username is already taken
        const existingUser = users.find((user) => user.username === username);
        if (existingUser) {
            return res.status(400).json({ message: 'Username already taken' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user object
        const newUser = {
            id: users.length + 1,
            username,
            password: hashedPassword,
        };

        // Add the user to the users array
        users.push(newUser);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Login
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find the user by username
        const user = users.find((user) => user.username === username);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the provided password matches the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        res.json({ message: 'Login successful' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
