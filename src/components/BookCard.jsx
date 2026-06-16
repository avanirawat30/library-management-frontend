import "./BookCard.css";

function BookCard(props) {
  return (
    <div className="book-card">

  <h3>{props.title}</h3>

  <p>{props.author}</p>

  <p className="status">
    {props.available
      ? "✅ Available"
      : "❌ Issued"}
  </p>

  {props.isAdmin && (
    <>
      <button className="edit-btn" onClick={props.onEdit}>
        ✏️ Edit
      </button>

      <button className="delete-btn" onClick={props.onDelete}>
        🗑️ Delete
      </button>
    </>
  )}

  {props.isStudent && props.available && (
   <button className="issue-btn" onClick={props.onIssue}>
      📚 Issue Book
    </button>
  )}

  {props.isStudent && !props.available && (
    <button className="return-btn" onClick={props.onReturn}>
      ↩️ Return Book
    </button>
  )}

</div>
  );
}

export default BookCard;