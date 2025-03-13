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

// Get the book list available in the shop using async-await and Axios
public_users.get('/', async (req, res) => {
    try {
        const response = await axios.get('URL_DE_TU_API_DE_LIBROS');
        const books = response.data;
        return res.status(200).json(books);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching books", error: error.message });
    }
});

// Get book details based on ISBN using async-await and Axios
public_users.get('/isbn/:isbn', async (req, res) => {
    const { isbn } = req.params;
    try {
        const response = await axios.get(`URL_DE_TU_API_DE_LIBROS/${isbn}`);
        const book = response.data;
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        return res.status(200).json(book);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching book details", error: error.message });
    }
 });

// Get book details based on author using async-await and Axios
public_users.get('/author/:author', async (req, res) => {
    const { author } = req.params;
    try {
        const response = await axios.get(`URL_DE_TU_API_DE_LIBROS/author/${author}`);
        const booksByAuthor = response.data;
        if (booksByAuthor.length === 0) {
            return res.status(404).json({ message: "No books found by this author" });
        }
        return res.status(200).json(booksByAuthor);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching books by author", error: error.message });
    }
 });

 // Get book details based on title using async-await and Axios
public_users.get('/title/:title', async (req, res) => {
    const { title } = req.params;
    try {
        const response = await axios.get(`URL_DE_TU_API_DE_LIBROS/title/${title}`);
        const booksByTitle = response.data;
        if (booksByTitle.length === 0) {
            return res.status(404).json({ message: "No books found with this title" });
        }
        return res.status(200).json(booksByTitle);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching books by title", error: error.message });
    }
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
