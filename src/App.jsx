import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import BookCard from "./components/BookCard";
function App() {
  const [books, setBooks] = useState([]);
const [title, setTitle] = useState("");
const [author, setAuthor] = useState("");
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
async function addBook() {
  if (!title || !author) {
    return;
  }

  try {
    await axios.post(
      "http://localhost:5000/books/add",
      {
        title: title,
        author: author
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
    await axios.delete(
      `http://localhost:5000/books/${id}`
    );

    fetchBooks();
  } catch (error) {
    console.log(error);
  }
}
  return (
    <div className="app">
      <Navbar />

      <h2 className="heading">
  Welcome to Library Management System
</h2>
      <p>
        Manage books, students and borrowing records.
      </p>
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
   ➕  Add Book
</button>
        {books.map((book) => (
  <BookCard
    key={book._id}
    title={book.title}
    author={book.author}
    onDelete={() => deleteBook(book._id)}
  />
))}
    </div>
  );
}

export default App;