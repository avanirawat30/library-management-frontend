import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import BookCard from "./components/BookCard";
import Login from "./components/Login";
import Register from "./components/Register";
function App() {
  const [books, setBooks] = useState([]);
const [title, setTitle] = useState("");
const [author, setAuthor] = useState("");
const [isLoggedIn, setIsLoggedIn] = useState(false);
async function fetchBooks() {
  try {
    const response = await axios.get(
  "http://localhost:5000/books"
);

    setBooks(response.data);
  } catch (error) {
    console.log(error);
  }
}
useEffect(() => {
  fetchBooks();
}, []);
useEffect(() => {
  const token = localStorage.getItem("token");

  if (token) {
    setIsLoggedIn(true);
  }
}, []);
async function addBook() {
  if (!title || !author) {
    return;
  }

  try {
    const token = localStorage.getItem("token");

await axios.post(
  "http://localhost:5000/books/add",
  {
    title: title,
    author: author
  },
  {
    headers: {
      Authorization: token
    }
  }
);

    fetchBooks();

    setTitle("");
    setAuthor("");
  } catch (error) {
    console.log(error);
  }
}
async function deleteBook(id) {
  try {
    const token = localStorage.getItem("token");

    await axios.delete(
      `http://localhost:5000/books/${id}`,
      {
        headers: {
          Authorization: token
        }
      }
    );

    fetchBooks();
  } catch (error) {
    console.log(error);
  }
}
async function updateBook(id) {
  const newTitle = prompt("Enter new title");

  const newAuthor = prompt("Enter new author");

  if (!newTitle || !newAuthor) {
    return;
  }

  try {
    const token = localStorage.getItem("token");

    await axios.put(
      `http://localhost:5000/books/${id}`,
      {
        title: newTitle,
        author: newAuthor
      },
      {
        headers: {
          Authorization: token
        }
      }
    );

    fetchBooks();
  } catch (error) {
    console.log(error);
  }
}
function logoutUser() {
  localStorage.removeItem("token");

  setIsLoggedIn(false);
}
  return (
  <div className="app">
    <Navbar />

    {isLoggedIn ? (
      <div>
        <h3>✅ Logged In</h3>

        <button onClick={logoutUser}>
          Logout
        </button>
      </div>
    ) : (
      <h3>❌ Logged Out</h3>
    )}

    {!isLoggedIn && (
      <>
        <h2 className="heading">
          Welcome to Library Management System
        </h2>

        <p>
          Manage books, students and borrowing records.
        </p>

        <Register />

        <Login setIsLoggedIn={setIsLoggedIn} />
      </>
    )}

    {isLoggedIn && (
      <>
        <div>
          <input
            type="text"
            placeholder="Enter book title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="text"
            placeholder="Enter author name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>

        <button
          className="action-btn"
          onClick={addBook}
        >
          ➕ Add Book
        </button>
      </>
    )}

    {books.map((book) => (
      <BookCard
        key={book._id}
        title={book.title}
        author={book.author}
        onEdit={() => updateBook(book._id)}
        onDelete={() => deleteBook(book._id)}
      />
    ))}
  </div>
);
}
export default App;