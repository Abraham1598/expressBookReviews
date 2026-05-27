const books = require('../data/booksdb');

const getAllBooks = () => {
    return books;
};

const getBookByISBN = (isbn) => {
    return books[isbn];
};

const getBooksByAuthor = (author) => {

    return Object.values(books).filter(
        (book) =>
            book.author.toLowerCase() === author.toLowerCase()
    );
};

const getBooksByTitle = (title) => {

    return Object.values(books).filter(
        (book) =>
            book.title.toLowerCase().includes(title.toLowerCase())
    );
};

module.exports = {
    getAllBooks,
    getBookByISBN,
    getBooksByAuthor,
    getBooksByTitle
};