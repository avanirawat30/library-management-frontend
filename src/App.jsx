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
function addBook() {
  if (!title || !author) {
    return;
  }

  const newBook = {
    title: title,
    author: author
  };

  setBooks([...books, newBook]);

  setTitle("");
  setAuthor("");
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
        {books.map((book, index) => (
  <BookCard
    key={index}
    title={book.title}
    author={book.author}
  />
))}
    </div>
  );
}

export default App;