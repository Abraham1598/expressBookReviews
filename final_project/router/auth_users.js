const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => {
    // Check if the username is valid (e.g., non-empty and not already taken)
    return username && !users.find(user => user.username === username);
};

const authenticatedUser = (username, password) => {
    // Check if username and password match the one we have in records.
    let user = users.find(user => user.username === username);
    return user && user.password === password;
};

// Register a new user
regd_users.post("/register", (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }
    if (!isValid(username)) {
        return res.status(400).json({ message: "Username is already taken or invalid" });
    }
    users.push({ username, password });
    return res.status(201).json({ message: "User registered successfully" });
});

// Only registered users can login
regd_users.post("/login", (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }
    if (!authenticatedUser(username, password)) {
        return res.status(401).json({ message: "Invalid username or password" });
    }

    // Generate a token for the authenticated user
    const token = jwt.sign({ username }, "your_jwt_secret_key", { expiresIn: '1h' });
    return res.status(200).json({ message: "Login successful", token });
});

// Add or modify a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    const { isbn } = req.params;
    const { review } = req.body;
    const token = req.headers["authorization"];

    if (!token) {
        return res.status(401).json({ message: "Authorization token required" });
    }

    try {
        const decoded = jwt.verify(token, "your_jwt_secret_key");
        const username = decoded.username;

        if (!books[isbn]) {
            return res.status(404).json({ message: "Book not found" });
        }

        // Find if there's an existing review by the same user
        const existingReview = books[isbn].reviews.find(r => r.username === username);
        if (existingReview) {
            // Modify the existing review
            existingReview.review = review;
        } else {
            // Add a new review
            books[isbn].reviews.push({ username, review });
        }

        return res.status(200).json({ message: "Review added/modified successfully" });
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
});

// Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
    const { isbn } = req.params;
    const token = req.headers["authorization"];

    if (!token) {
        return res.status(401).json({ message: "Authorization token required" });
    }

    try {
        const decoded = jwt.verify(token, "your_jwt_secret_key");
        const username = decoded.username;

        if (!books[isbn]) {
            return res.status(404).json({ message: "Book not found" });
        }

        // Filter out the review by the user
        books[isbn].reviews = books[isbn].reviews.filter(r => r.username !== username);

        return res.status(200).json({ message: "Review deleted successfully" });
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
});

module.exports.authenticated = regd_users;
 module.exports.isValid = isValid;
 module.exports.users = users;