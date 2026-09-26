import HobbyCard from "./HobbyCard.jsx";
import { hobbies } from "./hobbiesData.js";

function HobbySection() {
  return (
    <div className="hobby-section">
      <div className="hobby-section-header">
        <h2>Student Hobbies</h2>
      </div>
      <div className="hobby-grid">
        {hobbies.map((hobby) => (
          <HobbyCard key={hobby.hobbyName} {...hobby} />
        ))}
      </div>
    </div>
  );
}

export default HobbySection;