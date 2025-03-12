const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Register a new user
public_users.post("/register", (req, res) => {
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

// Get the book list available in the shop
public_users.get('/', (req, res) => {
    return res.status(200).send(JSON.stringify(books, null, 4));
    
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', (req, res) => {
    const { isbn } = req.params;
    if (!books[isbn]) {
        return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).json(books[isbn]);
});

// Get book details based on author
public_users.get('/author/:author', (req, res) => {
    const { author } = req.params;
    let filteredBooks = [];
    for (let key in books) {
        if (books[key].author === author) {
            filteredBooks.push(books[key]);
        }
    }
    if (filteredBooks.length === 0) {
        return res.status(404).json({ message: "No books found by this author" });
    }
    return res.status(200).json(filteredBooks);
});

// Get all books based on title
public_users.get('/title/:title', (req, res) => {
    const { title } = req.params;
    let filteredBooks = [];
    for (let key in books) {
        if (books[key].title === title) {
            filteredBooks.push(books[key]);
        }
    }
    if (filteredBooks.length === 0) {
        return res.status(404).json({ message: "No books found with this title" });
    }
    return res.status(200).json(filteredBooks);
});

//  Get book review
public_users.get('/review/:isbn', (req, res) => {
    const { isbn } = req.params;
    if (!books[isbn]) {
        return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).json(books[isbn].reviews);
});

module.exports.general = public_users;
