import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import BookCard from "./components/BookCard";
import Login from "./components/Login";
import Register from "./components/Register";
import "./App.css";
function App() {
  const [books, setBooks] = useState([]);
const [title, setTitle] = useState("");
const [author, setAuthor] = useState("");
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [myBooks, setMyBooks] = useState([]);
const [searchTerm, setSearchTerm] = useState("");
const [message, setMessage] = useState("");
const [allIssuedBooks, setAllIssuedBooks] = useState([]);
const role = localStorage.getItem("role");
async function fetchBooks() {
  try {
    const response = await axios.get(
  "https://library-management-backend-8k7b.onrender.com/books"
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
      "https://library-management-backend-8k7b.onrender.com/issues/my-books",
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

    if (role === "admin") {
      fetchAllIssuedBooks();
    }
  }
}, []);
async function fetchAllIssuedBooks() {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      "https://library-management-backend-8k7b.onrender.com/issues/all-issued",
      {
        headers: {
          Authorization: token
        }
      }
    );

    setAllIssuedBooks(response.data);

  } catch (error) {
    console.log(error);
  }
}
async function addBook() {
  if (!title || !author) {
    return;
  }

  try {
    const token = localStorage.getItem("token");

await axios.post(
  "https://library-management-backend-8k7b.onrender.com/books/add",
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
    setMessage("✅ Book added successfully");
    setTitle("");
    setAuthor("");
  } catch (error) {
  console.log(error);
  console.log(error.response.data);
  setMessage("❌ Failed to add book");
}
}
async function deleteBook(id) {
  try {
    const token = localStorage.getItem("token");

    await axios.delete(
      `https://library-management-backend-8k7b.onrender.com/books/${id}`,
      {
        headers: {
          Authorization: token
        }
      }
    );

    fetchBooks();
    setMessage("✅ Book deleted successfully");
  } catch (error) {
  console.log(error);

  setMessage(
    error.response?.data?.message ||
    "❌ Failed to delete book"
  );
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
      `https://library-management-backend-8k7b.onrender.com/books/${id}`,
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
    setMessage("✅ Book updated successfully");
  } catch (error) {
    console.log(error);
    setMessage("❌ Failed to update book");
  }
}
async function issueBook(id) {
  try {
    const token = localStorage.getItem("token");
    await axios.post(
      `https://library-management-backend-8k7b.onrender.com/issues/issue/${id}`,
      {},
      {
        headers: {
          Authorization: token
        }
      }
    );

    fetchBooks();
    setMessage("✅ Book issued successfully");
    fetchMyBooks();
if (role === "admin") {
  fetchAllIssuedBooks();
}
  } catch (error) {
    console.log(error);
    console.log(error.response.data);
    setMessage("❌ Unable to issue book");
  }
}
async function returnBook(id) {
  try {
    const token = localStorage.getItem("token");

    await axios.post(
      `https://library-management-backend-8k7b.onrender.com/issues/return/${id}`,
      {},
      {
        headers: {
          Authorization: token
        }
      }
    );

    fetchBooks();
    setMessage("✅ Book returned successfully");
    fetchMyBooks();
    if (role === "admin") {
  fetchAllIssuedBooks();
}

  } catch (error) {
    console.log(error);
    console.log(error.response.data);
    setMessage("❌ Unable to return book");
  }
}
function logoutUser() {
  localStorage.removeItem("token");
  localStorage.removeItem("role");

  setIsLoggedIn(false);
  setMyBooks([]);
  setMessage("");
}
const totalBooks = books.length;

const availableBooks = books.filter(
  (book) => book.available
).length;

const issuedBooks = books.filter(
  (book) => !book.available
).length;
const today = new Date();
const dueSoonBooks = allIssuedBooks.filter((issue) => {
  if (!issue.dueDate) return false;

  const dueDate = new Date(issue.dueDate);

  const diffDays =
    (dueDate - today) / (1000 * 60 * 60 * 24);

  return diffDays <= 3; // due soon or overdue
});
const filteredBooks = books.filter((book) =>
  book.title
    .toLowerCase()
    .includes(searchTerm.toLowerCase()) ||
  book.author
    .toLowerCase()
    .includes(searchTerm.toLowerCase())
);
  return (
  <div className="app">
    <Navbar />

    {isLoggedIn ? (
  <div>
    <h3>
      {role === "admin"
        ? "✅ Logged In as Admin"
        : "✅ Logged In as Student"}
    </h3>

    <button
      className="logout-btn"
      onClick={logoutUser}
    >
      Logout
    </button>
  </div>
) : (
  <h3>👋 Welcome Guest</h3>
)}
    {message && (
  <div className="message-box">
    {message}
  </div>
)}
    {!isLoggedIn && (
      <>
        <h2 className="heading">
          Welcome to Library Management System
        </h2>

        <p>
          Manage books, students and borrowing records.
        </p>
<div className="auth-container">

  <div className="auth-box">
    <Register />
  </div>

  <div className="auth-box">
    <Login
      setIsLoggedIn={setIsLoggedIn}
      fetchMyBooks={fetchMyBooks}
    />
  </div>

</div>
      </>
    )}

    {isLoggedIn && role === "admin" && (
  <>
  <div className="dashboard">
  <h2>📊 Library Statistics</h2>

  <div className="stats-container">

    <div className="stat-card">
      <h3>{totalBooks}</h3>
      <p>Total Books</p>
    </div>

    <div className="stat-card">
      <h3>{availableBooks}</h3>
      <p>Available</p>
    </div>

    <div className="stat-card">
      <h3>{issuedBooks}</h3>
      <p>Issued</p>
    </div>
    <div className="stat-card">
  <h3>{dueSoonBooks.length}</h3>
  <p>📌 Due Soon</p>
</div>

  </div>
</div>
<h3>📅 Books Due Soon</h3>

{dueSoonBooks.length === 0 ? (
  <p>No books due soon.</p>
) : (
  dueSoonBooks.map((issue) => (
    <div key={issue._id}>
      <p>
        <strong>{issue.book?.title || "Book Deleted"}</strong>
      </p>

      <p>
        <p>
  Borrowed by: {issue.user?.name || "Unknown User"}
</p>
      </p>

      <p>
        Due: {new Date(
          issue.dueDate
        ).toDateString()}
      </p>
    </div>
  ))
)}
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

    {myBooks.length === 0 ? (
  <p>No books issued yet.</p>
) : (
  myBooks.map((issue) => {
  const isOverdue =
    new Date() > new Date(issue.dueDate);

  return (
    <div key={issue._id} className="issue-card">
      <h3>{issue.book?.title || "Book Deleted"}</h3>
<p>Author: {issue.book?.author || "Unknown Author"}</p>

      <p>
        Issued On:{" "}
        {new Date(issue.issueDate).toDateString()}
      </p>

      <p>
        Due Date:{" "}
        {new Date(issue.dueDate).toDateString()}
      </p>

      {isOverdue ? (
        <p style={{ color: "red", fontWeight: "bold" }}>
          🔴 OVERDUE
        </p>
      ) : (
        <p style={{ color: "green" }}>
          🟢 ON TIME
        </p>
      )}
    </div>
  );
})
)}
  </div>
)}
<div className="search-container">
  <input
    className="search-input"
    type="text"
    placeholder="🔍 Search books by title or author..."
    value={searchTerm}
    onChange={(e) =>
      setSearchTerm(e.target.value)
    }
  />
</div>

    {filteredBooks.map((book) => (
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