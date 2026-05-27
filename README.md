# 📚 Book Review API

REST API built with Node.js and Express.js for managing books and reviews with JWT authentication.

---

# 🚀 Features

- User registration and login
- JWT authentication
- Book listing
- Search books by:
  - ISBN
  - Author
  - Title
- Add and delete reviews
- RESTful API structure
- Layered architecture
- Environment variable configuration

---

# 🛠 Tech Stack

- Node.js
- Express.js
- JWT
- Bcrypt
- Express Session
- REST API
- JavaScript

---

# 📁 Project Structure

```bash
src/
 ├── controllers/
 ├── routes/
 ├── middlewares/
 ├── services/
 ├── data/
 └── app.js
```

---

# ⚙️ Installation

## Clone repository

```bash
git clone https://github.com/Abraham1598/expressBookReviews.git
```

## Install dependencies

```bash
npm install
```

## Configure environment variables

Create a `.env` file:

```env
PORT=5000
JWT_SECRET=your_secret_key
SESSION_SECRET=your_session_secret
```

## Run project

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

---

# 📌 API Endpoints

## Books

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Get all books |
| GET | `/isbn/:isbn` | Get book by ISBN |
| GET | `/author/:author` | Get books by author |
| GET | `/title/:title` | Get books by title |

---

## Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/customer/register` | Register user |
| POST | `/customer/login` | Login user |

---

## Reviews

| Method | Endpoint | Description |
|---|---|---|
| PUT | `/customer/auth/review/:isbn` | Add/modify review |
| DELETE | `/customer/auth/review/:isbn` | Delete review |

---

# 🔐 Authentication

Protected routes require JWT token in Authorization header:

```bash
Authorization: your_jwt_token
```

---

# 🎯 Future Improvements

- MongoDB integration
- MySQL integration
- Swagger documentation
- Unit testing
- Docker support
- Deployment

---

# 👨‍💻 Author

Abraham  
Backend-focused Full Stack Developer