import "./HobbyCard.css";

function HobbyCard({ hobbyName, description, image }) {
  return (
    <article className="hobby-card">
      <div className="hobby-card-image-wrap">
        <img src={image} alt={hobbyName} className="hobby-card-image" />
      </div>
      <div className="hobby-card-content">
        <h3>{hobbyName}</h3>
        <p>{description}</p>
      </div>
    </article>
  );
}

export default HobbyCard;
