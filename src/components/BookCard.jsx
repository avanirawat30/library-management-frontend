import "./BookCard.css";

function BookCard(props) {
  return (
    <div className="book-card">
      <h3>{props.title}</h3>

      <p>{props.author}</p>

      <button onClick={props.onDelete}>
        🗑️ Delete
      </button>
    </div>
  );
}

export default BookCard;