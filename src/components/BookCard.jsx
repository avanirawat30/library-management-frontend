function BookCard(props) {
  return (
    <div>
      <h3>{props.title}</h3>
      <p>{props.author}</p>
    </div>
  );
}

export default BookCard;