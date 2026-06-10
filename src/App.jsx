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
function addBook() {
    setBooks([
      ...books,
      {
        title: "Think and Grow Rich",
        author: "Napoleon Hill"
      }
    ]);
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