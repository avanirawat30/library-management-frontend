import "./BookCard.css";

function BookCard(props) {
  return (
    <div className="book-card">

      <h3>{props.title}</h3>

      <p>{props.author}</p>

      <p>
        {props.available
          ? "✅ Available"
          : "❌ Issued"}
      </p>

      {props.isAdmin && (
        <>
          <button onClick={props.onEdit}>
            ✏️ Edit
          </button>

          <button onClick={props.onDelete}>
            🗑️ Delete
          </button>
        </>
      )}

      {props.isStudent && props.available && (
        <button onClick={props.onIssue}>
          📚 Issue Book
        </button>
      )}

      {props.isStudent && !props.available && (
        <button onClick={props.onReturn}>
          ↩️ Return Book
        </button>
      )}

    </div>
  );
}

export default BookCard;