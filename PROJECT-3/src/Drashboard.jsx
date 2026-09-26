import "./Drashboard.css";
import studentImage from "./idcard.jpeg";

function Drashboard() {
  const student = {
    name: "Keerthana",
    department: "B.E - CSE",
    studentId: "45673",
    year: "2025 - 2029",
    description:
      "Keerthana is a hardworking Computer Science student who enjoys building React projects and learning new UI patterns.",
  };

  return (
    <div className="dashboard">
      <div className="dashboard-card">
        <header className="dashboard-header">
          <div>
            <p className="dashboard-tag">Student Portal</p>
            <h1>Hello World</h1>
          </div>
          <span className="status-badge">Active</span>
        </header>

        <section className="student-card">
          <img src={studentImage} alt="Student" className="student-photo" />
          <div className="student-info">
            <h2>{student.name}</h2>
            <p>
              <span>Department:</span> {student.department}
            </p>
            <p>
              <span>Student ID:</span> {student.studentId}
            </p>
            <p>
              <span>Year:</span> {student.year}
            </p>
          </div>
        </section>

        <section className="dashboard-description">
          <h3>About Student</h3>
          <p>{student.description}</p>
        </section>

        <footer className="dashboard-footer">
          © {new Date().getFullYear()} Prince Dr. K. Vasudevan College of Technology
        </footer>
      </div>
    </div>
  );
}

export default Drashboard;
