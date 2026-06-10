import { useState } from "react";
import Navbar from "./components/Navbar";
import BookCard from "./components/BookCard";
function App() {
  const [books, setBooks] = useState([
  {
    title: "Harry Potter",
    author: "J.K. Rowling"
  },
  {
    title: "Atomic Habits",
    author: "James Clear"
  },
  {
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki"
  },
  {
  title: "The Alchemist",
  author: "Paulo Coelho"
}
]);
const [title, setTitle] = useState("");
const [author, setAuthor] = useState("");
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