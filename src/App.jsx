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
const [myBooks, setMyBooks] = useState([]);
const role = localStorage.getItem("role");
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
async function fetchMyBooks() {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      "http://localhost:5000/issues/my-books",
      {
        headers: {
          Authorization: token
        }
      }
    );

    setMyBooks(response.data);

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
  fetchMyBooks();
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
  console.log(error.response.data);
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
async function issueBook(id) {
  try {
    const token = localStorage.getItem("token");

    await axios.post(
      `http://localhost:5000/issues/issue/${id}`,
      {},
      {
        headers: {
          Authorization: token
        }
      }
    );

    fetchBooks();
    fetchMyBooks();

  } catch (error) {
    console.log(error);
    console.log(error.response.data);
  }
}
async function returnBook(id) {
  try {
    const token = localStorage.getItem("token");

    await axios.post(
      `http://localhost:5000/issues/return/${id}`,
      {},
      {
        headers: {
          Authorization: token
        }
      }
    );

    fetchBooks();
    fetchMyBooks();

  } catch (error) {
    console.log(error);
    console.log(error.response.data);
  }
}
function logoutUser() {
  localStorage.removeItem("token");
  localStorage.removeItem("role");

  setIsLoggedIn(false);
  setMyBooks([]);
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

        <Login setIsLoggedIn={setIsLoggedIn} 
        fetchMyBooks={fetchMyBooks}/>
      </>
    )}

    {isLoggedIn && role === "admin" && (
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
{isLoggedIn && role === "student" && (
  <div>
    <h2>📚 My Issued Books</h2>

    {myBooks.map((issue) => (
      <div key={issue._id}>
        <p>
          {issue.book.title}
          {" - "}
          {issue.book.author}
        </p>
      </div>
    ))}
  </div>
)}

    {books.map((book) => (
      <BookCard
  key={book._id}
  title={book.title}
  author={book.author}
  available={book.available}
  isAdmin={role === "admin"}
  isStudent={role === "student"}
  onEdit={() => updateBook(book._id)}
  onDelete={() => deleteBook(book._id)}
  onIssue={() => issueBook(book._id)}
  onReturn={() => returnBook(book._id)}
/>
    ))}
  </div>
);
}
export default App;