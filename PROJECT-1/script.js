const studentForm = document.getElementById('student-form');
const profileCard = document.getElementById('profile-card');

const displayName = document.getElementById('display-name');
const displayRoll = document.getElementById('display-roll');
const displayMarks = document.getElementById('display-marks');
const displayGrade = document.getElementById('display-grade');
const displayStatus = document.getElementById('display-status');

function getGrade(marks) {
  if (marks >= 90) return 'A+';
  if (marks >= 80) return 'A';
  if (marks >= 70) return 'B';
  if (marks >= 60) return 'C';
  if (marks >= 50) return 'D';
  if (marks >= 40) return 'E';
  return 'F';
}

function getStatus(marks) {
  if (marks >= 90) return 'Excellent';
  if (marks >= 75) return 'Good';
  if (marks >= 60) return 'Average';
  if (marks >= 40) return 'Need Improvement';
  return 'Fail';
}

studentForm.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!studentForm.reportValidity()) return;

  const formData = new FormData(studentForm);
  const name = formData.get('studentName').trim();
  const rollNumber = formData.get('rollNumber').trim();
  const marks = Number(formData.get('marks'));

  if (!name || !rollNumber || !Number.isInteger(marks) || marks < 0 || marks > 100) return;

  displayName.textContent = name;
  displayRoll.textContent = rollNumber;
  displayMarks.textContent = String(marks);
  displayGrade.textContent = getGrade(marks);
  displayStatus.textContent = getStatus(marks);
  displayStatus.dataset.status = marks < 40 ? 'fail' : 'pass';

  profileCard.hidden = false;
});
