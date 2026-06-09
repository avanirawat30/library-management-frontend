import Navbar from "./components/Navbar";
import BookCard from "./components/BookCard";
function App() {
  return (
    <div>
      <Navbar />

      <h2>Welcome to Library Management System</h2>

      <p>
        Manage books, students and borrowing records.
      </p>
        <button>View Books</button>
        <BookCard
  title="Harry Potter"
  author="J.K. Rowling"
/>
    </div>
  );
}

export default App;