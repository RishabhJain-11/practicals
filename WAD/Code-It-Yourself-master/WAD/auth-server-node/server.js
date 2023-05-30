const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;
const secretKey = 'svlkjnasvjnldnd12rblskajd4la'; // Replace with your secret key for JWT

app.use(express.json());

// In-memory storage for simplicity (replace with a database in a real-world scenario)
const users = [];

// Register a new user
app.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user already exists
        if (users.find(user => user.email === email)) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user object
        const user = { email, password: hashedPassword };

        // Store the user in memory
        users.push(user);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// User login
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user
        const user = users.find(user => user.email === email);

        // Check if the user exists
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Verify the password
        const passwordMatch = await bcrypt.compare(password, user.password);

        // Check if the password matches
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Create and sign a JWT token
        const token = jwt.sign({ email }, secretKey);

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Protected route example
app.get('/protected', (req, res) => {
    // Check for the presence of the authorization header
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        // Verify and decode the token
        const decoded = jwt.verify(token, secretKey);

        // Access the email from the decoded token
        const email = decoded.email;

        res.status(200).json({ message: `Protected route accessed by ${email}` });
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
