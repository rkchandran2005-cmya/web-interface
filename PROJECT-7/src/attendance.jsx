import { useState } from 'react';
import './attendance.css';

const startingStudents = [
  { id: 1, name: 'Ava Johnson', status: '' },
  { id: 2, name: 'Liam Chen', status: '' },
  { id: 3, name: 'Mia Williams', status: '' },
  { id: 4, name: 'Noah Smith', status: '' },
  { id: 5, name: 'Sophia Patel', status: '' },
];

function Attendance() {
  const [students, setStudents] = useState(startingStudents);
  const [search, setSearch] = useState('');

  function markAttendance(id, status) {
    setStudents(students.map((student) => (
      student.id === id ? { ...student, status } : student
    )));
  }

  function resetAttendance() {
    setStudents(students.map((student) => ({ ...student, status: '' })));
  }

  const present = students.filter((student) => student.status === 'Present').length;
  const absent = students.filter((student) => student.status === 'Absent').length;
  const completed = present + absent;
  const filteredStudents = students.filter((student) => (
    student.name.toLowerCase().includes(search.toLowerCase())
  ));

  return (
    <main className="attendance-app">
      <header>
        <h1>Attendance Management</h1>
        <p>Design Principles Class · Today</p>
      </header>

      <section className="summary">
        <div><strong>{completed}/{students.length}</strong><span>Marked</span></div>
        <div><strong>{present}</strong><span>Present</span></div>
        <div><strong>{absent}</strong><span>Absent</span></div>
        <button onClick={resetAttendance}>Reset</button>
      </section>

      <section className="student-box">
        <div className="student-heading">
          <h2>Students</h2>
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search students" aria-label="Search students" />
        </div>
        {filteredStudents.map((student) => (
          <div className="student" key={student.id}>
            <div>
              <strong>{student.name}</strong>
              <span className={student.status.toLowerCase()}>{student.status || 'Not marked'}</span>
            </div>
            <div className="actions">
              <button onClick={() => markAttendance(student.id, 'Present')}>Present</button>
              <button onClick={() => markAttendance(student.id, 'Absent')}>Absent</button>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}

export default Attendance;
