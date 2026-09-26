const semesters = [
  {
    name: "Semester 01",
    term: "Fall 2024",
    courses: [
      { code: "CS 101", title: "Introduction to Computing", credits: 3, score: 88 },
      { code: "MTH 110", title: "Calculus I", credits: 4, score: 81 },
      { code: "ENG 105", title: "Academic Writing", credits: 3, score: 92 },
      { code: "PHY 120", title: "Applied Physics", credits: 4, score: 76 },
    ],
  },
  {
    name: "Semester 02",
    term: "Spring 2025",
    courses: [
      { code: "CS 120", title: "Programming Fundamentals", credits: 4, score: 94 },
      { code: "MTH 125", title: "Discrete Mathematics", credits: 3, score: 86 },
      { code: "STA 130", title: "Probability & Statistics", credits: 3, score: 79 },
      { code: "COM 115", title: "Communication Skills", credits: 2, score: 90 },
    ],
  },
  {
    name: "Semester 03",
    term: "Fall 2025",
    courses: [
      { code: "CS 210", title: "Data Structures", credits: 4, score: 91 },
      { code: "CS 220", title: "Database Systems", credits: 3, score: 84 },
      { code: "MTH 205", title: "Linear Algebra", credits: 3, score: 73 },
      { code: "HUM 201", title: "Ethics & Society", credits: 2, score: 96 },
    ],
  },
];

const student = {
  name: "Avery Morgan",
  id: "STU-2024-0186",
  program: "BSc Computer Science",
  department: "School of Computing",
  academicYear: "2024 – 2025",
  advisor: "Dr. Jordan Lee",
};

function gradeFor(score) {
  if (score >= 90) return { letter: "A", points: 4.0 };
  if (score >= 85) return { letter: "B+", points: 3.5 };
  if (score >= 80) return { letter: "B", points: 3.0 };
  if (score >= 75) return { letter: "C+", points: 2.5 };
  if (score >= 70) return { letter: "C", points: 2.0 };
  if (score >= 60) return { letter: "D", points: 1.0 };
  return { letter: "F", points: 0.0 };
}

function summarizeCourses(courses) {
  const credits = courses.reduce((total, course) => total + course.credits, 0);
  const qualityPoints = courses.reduce(
    (total, course) => total + gradeFor(course.score).points * course.credits,
    0,
  );

  return { credits, cgpa: credits ? qualityPoints / credits : 0 };
}

const allCourses = semesters.flatMap((semester) => semester.courses);
const overall = summarizeCourses(allCourses);

function StudentReportCard() {
  return (
    <main className="report-page">
      <style>{`
        .report-page {
          --report-ink: #172b2a;
          --report-muted: #697a75;
          --report-line: #dce5df;
          --report-green: #176b59;
          --report-lime: #d9ef77;
          min-height: 100vh;
          padding: 38px 24px 64px;
          background: #f2f5ef;
          color: var(--report-ink);
          font-family: "Trebuchet MS", "Segoe UI", sans-serif;
        }
        .report-wrap { max-width: 1040px; margin: 0 auto; }
        .report-topline {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 26px;
          color: var(--report-muted);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .12em;
          text-transform: uppercase;
        }
        .report-mark { display: flex; align-items: center; gap: 10px; }
        .report-mark-icon {
          display: grid;
          width: 34px;
          height: 34px;
          place-items: center;
          border-radius: 50%;
          background: var(--report-green);
          color: white;
          font-size: 15px;
        }
        .report-print {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 9px 12px;
          border: 1px solid var(--report-line);
          border-radius: 4px;
          background: #fff;
          color: var(--report-ink);
          cursor: pointer;
          font: inherit;
          letter-spacing: 0;
          text-transform: none;
        }
        .report-print:hover { border-color: var(--report-green); color: var(--report-green); }
        .report-hero {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 230px;
          gap: 28px;
          align-items: end;
          padding: 37px 40px 34px;
          border-radius: 6px 6px 0 0;
          background: var(--report-green);
          color: #fff;
        }
        .report-kicker { margin: 0 0 13px; color: var(--report-lime); font-size: 10px; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; }
        .report-hero h1 { margin: 0; font-family: Georgia, "Times New Roman", serif; font-size: 42px; font-weight: 400; line-height: 1.08; }
        .report-hero p { margin: 12px 0 0; color: #d4e6dc; font-size: 13px; }
        .report-current {
          padding: 18px 20px;
          border: 1px solid rgba(255,255,255,.23);
          border-radius: 4px;
          background: rgba(7, 44, 36, .17);
        }
        .report-current span { display: block; color: #d4e6dc; font-size: 10px; font-weight: 700; letter-spacing: .11em; text-transform: uppercase; }
        .report-current strong { display: block; margin-top: 4px; color: var(--report-lime); font-family: Georgia, "Times New Roman", serif; font-size: 40px; font-weight: 400; }
        .report-current small { color: #d4e6dc; font-size: 11px; }
        .report-body { padding: 30px 40px 40px; border: 1px solid var(--report-line); border-top: 0; border-radius: 0 0 6px 6px; background: #fff; }
        .student-details { display: grid; grid-template-columns: 1.4fr 1fr 1fr; gap: 20px 30px; padding: 0 0 28px; border-bottom: 1px solid var(--report-line); }
        .student-detail span { display: block; margin-bottom: 6px; color: var(--report-muted); font-size: 9px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; }
        .student-detail strong { font-size: 13px; font-weight: 600; }
        .report-summary { display: grid; grid-template-columns: repeat(3, 1fr); margin: 25px 0 36px; border: 1px solid var(--report-line); border-radius: 4px; }
        .summary-item { padding: 15px 19px; }
        .summary-item + .summary-item { border-left: 1px solid var(--report-line); }
        .summary-item span { display: block; margin-bottom: 6px; color: var(--report-muted); font-size: 9px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; }
        .summary-item strong { font-family: Georgia, "Times New Roman", serif; font-size: 22px; font-weight: 400; }
        .semester-block + .semester-block { margin-top: 31px; }
        .semester-heading { display: flex; align-items: baseline; justify-content: space-between; gap: 14px; margin-bottom: 12px; }
        .semester-title { display: flex; align-items: baseline; gap: 11px; }
        .semester-title h2 { margin: 0; font-family: Georgia, "Times New Roman", serif; font-size: 20px; font-weight: 400; }
        .semester-title span, .semester-meta { color: var(--report-muted); font-size: 11px; }
        .semester-meta strong { color: var(--report-green); font-size: 13px; }
        .course-table { width: 100%; border-collapse: collapse; text-align: left; }
        .course-table th { padding: 10px 12px; border-top: 1px solid var(--report-line); border-bottom: 1px solid var(--report-line); color: var(--report-muted); font-size: 9px; font-weight: 700; letter-spacing: .09em; text-transform: uppercase; }
        .course-table td { padding: 12px; border-bottom: 1px solid #edf1ed; font-size: 12px; }
        .course-table th:first-child, .course-table td:first-child { padding-left: 0; }
        .course-code { color: var(--report-muted); font-size: 10px !important; font-weight: 700; white-space: nowrap; }
        .course-title { font-weight: 600; }
        .course-grade { color: var(--report-green); font-weight: 700; }
        .report-footer { display: flex; justify-content: space-between; gap: 15px; padding-top: 25px; color: var(--report-muted); font-size: 10px; }
        .report-footer strong { color: var(--report-ink); }
        @media (max-width: 680px) {
          .report-page { padding: 20px 12px 38px; }
          .report-topline { align-items: flex-start; font-size: 9px; }
          .report-hero { grid-template-columns: 1fr; gap: 22px; padding: 28px 23px; }
          .report-hero h1 { font-size: 34px; }
          .report-current { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
          .report-current strong { margin: 0; font-size: 30px; }
          .report-body { padding: 24px 20px 28px; }
          .student-details { grid-template-columns: 1fr 1fr; gap: 18px; }
          .report-summary { margin: 20px 0 30px; }
          .summary-item { padding: 13px 10px; }
          .summary-item strong { font-size: 18px; }
          .semester-heading { align-items: flex-start; }
          .semester-title { display: block; }
          .semester-title span { display: block; margin-top: 4px; }
          .course-table th, .course-table td { padding: 10px 6px; }
          .course-table th { font-size: 8px; }
          .course-table td { font-size: 11px; }
          .course-title { min-width: 120px; }
          .course-code { font-size: 9px !important; }
        }
        @media print {
          .report-page { min-height: 0; padding: 0; background: #fff; }
          .report-topline { margin-bottom: 14px; }
          .report-print { display: none; }
          .report-hero, .report-current { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
          .report-body { padding: 24px 30px; }
          .semester-block { break-inside: avoid; }
        }
      `}</style>

      <div className="report-wrap">
        <div className="report-topline">
          <div className="report-mark">
            <span className="report-mark-icon" aria-hidden="true">✳</span>
            <span>Northfield University</span>
          </div>
          <button className="report-print" type="button" onClick={() => window.print()}>
            <span aria-hidden="true">▤</span> Print report
          </button>
        </div>

        <header className="report-hero">
          <div>
            <p className="report-kicker">Official academic record · {student.academicYear}</p>
            <h1>Student report card</h1>
            <p>{student.program} &nbsp;·&nbsp; {student.department}</p>
          </div>
          <div className="report-current" aria-label={`Current cumulative GPA ${overall.cgpa.toFixed(2)} out of 4.00`}>
            <div>
              <span>Current CGPA</span>
              <strong>{overall.cgpa.toFixed(2)}</strong>
            </div>
            <small>out of 4.00</small>
          </div>
        </header>

        <section className="report-body" aria-label="Academic report">
          <div className="student-details">
            <div className="student-detail"><span>Student name</span><strong>{student.name}</strong></div>
            <div className="student-detail"><span>Student ID</span><strong>{student.id}</strong></div>
            <div className="student-detail"><span>Academic year</span><strong>{student.academicYear}</strong></div>
            <div className="student-detail"><span>Program</span><strong>{student.program}</strong></div>
            <div className="student-detail"><span>Department</span><strong>{student.department}</strong></div>
            <div className="student-detail"><span>Academic advisor</span><strong>{student.advisor}</strong></div>
          </div>

          <div className="report-summary" aria-label="Overall academic summary">
            <div className="summary-item"><span>Semesters completed</span><strong>{semesters.length}</strong></div>
            <div className="summary-item"><span>Credits earned</span><strong>{overall.credits}</strong></div>
            <div className="summary-item"><span>Grading scale</span><strong>4.00</strong></div>
          </div>

          {semesters.map((semester) => {
            const summary = summarizeCourses(semester.courses);
            return (
              <section className="semester-block" key={semester.name} aria-labelledby={`${semester.name}-heading`}>
                <div className="semester-heading">
                  <div className="semester-title">
                    <h2 id={`${semester.name}-heading`}>{semester.name}</h2>
                    <span>{semester.term}</span>
                  </div>
                  <div className="semester-meta">Semester CGPA: <strong>{summary.cgpa.toFixed(2)}</strong></div>
                </div>
                <table className="course-table">
                  <thead>
                    <tr><th scope="col">Course</th><th scope="col">Course title</th><th scope="col">Credits</th><th scope="col">Score</th><th scope="col">Grade</th></tr>
                  </thead>
                  <tbody>
                    {semester.courses.map((course) => (
                      <tr key={course.code}>
                        <td className="course-code">{course.code}</td>
                        <td className="course-title">{course.title}</td>
                        <td>{course.credits}</td>
                        <td>{course.score}%</td>
                        <td className="course-grade">{gradeFor(course.score).letter}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            );
          })}

          <footer className="report-footer">
            <span>Grade points are weighted by course credits.</span>
            <span>Record for <strong>{student.id}</strong></span>
          </footer>
        </section>
      </div>
    </main>
  );
}

export default StudentReportCard;