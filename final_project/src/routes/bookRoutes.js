const express = require('express');

const router = express.Router();

const {
    getBooks,
    getBookByISBN,
    getBooksByAuthor,
    getBooksByTitle,
    addReview,
    deleteReview
} = require('../controllers/bookController');

const authMiddleware = require('../middlewares/auth');


router.get('/', getBooks);

router.get('/isbn/:isbn', getBookByISBN);

router.get('/author/:author', getBooksByAuthor);

router.get('/title/:title', getBooksByTitle);


router.put(
    '/customer/auth/review/:isbn',
    authMiddleware,
    addReview
);


router.delete(
    '/customer/auth/review/:isbn',
    authMiddleware,
    deleteReview
);


module.exports = router;