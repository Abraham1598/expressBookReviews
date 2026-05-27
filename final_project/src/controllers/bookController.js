const books = require('../data/booksdb');


const getBooks = async (req, res) => {

    try {

        return res.status(200).json({
            success: true,
            books
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Error fetching books"
        });
    }
};


const getBookByISBN = async (req, res) => {

    const { isbn } = req.params;

    try {

        const book = books[isbn];

        if (!book) {

            return res.status(404).json({
                success: false,
                message: "Book not found"
            });
        }

        return res.status(200).json({
            success: true,
            book
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Error fetching book"
        });
    }
};


const getBooksByAuthor = async (req, res) => {

    const { author } = req.params;

    try {

        const filteredBooks = Object.values(books).filter(
            (book) =>
                book.author.toLowerCase() === author.toLowerCase()
        );

        return res.status(200).json({
            success: true,
            books: filteredBooks
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Error fetching books by author"
        });
    }
};


const getBooksByTitle = async (req, res) => {

    const { title } = req.params;

    try {

        const filteredBooks = Object.values(books).filter(
            (book) =>
                book.title.toLowerCase().includes(title.toLowerCase())
        );

        return res.status(200).json({
            success: true,
            books: filteredBooks
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Error fetching books by title"
        });
    }
};


const addReview = async (req, res) => {

    const { isbn } = req.params;

    const { review } = req.body;

    const username = req.user.username;

    try {

        const book = books[isbn];

        if (!book) {

            return res.status(404).json({
                success: false,
                message: "Book not found"
            });
        }

        if (!book.reviews) {
            book.reviews = {};
        }

        book.reviews[username] = review;

        return res.status(200).json({
            success: true,
            message: "Review added successfully",
            reviews: book.reviews
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Error adding review"
        });
    }
};


const deleteReview = async (req, res) => {

    const { isbn } = req.params;

    const username = req.user.username;

    try {

        const book = books[isbn];

        if (!book) {

            return res.status(404).json({
                success: false,
                message: "Book not found"
            });
        }

        if (!book.reviews || !book.reviews[username]) {

            return res.status(404).json({
                success: false,
                message: "Review not found"
            });
        }

        delete book.reviews[username];

        return res.status(200).json({
            success: true,
            message: "Review deleted successfully",
            reviews: book.reviews
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Error deleting review"
        });
    }
};


module.exports = {
    getBooks,
    getBookByISBN,
    getBooksByAuthor,
    getBooksByTitle,
    addReview,
    deleteReview
};