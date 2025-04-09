// scripts/thankyou.js
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const submissionData = document.getElementById('submissionData');
  if (submissionData) {
    submissionData.innerHTML = `
      <p><strong>Name:</strong> ${params.get('name')}</p>
      <p><strong>Email:</strong> ${params.get('email')}</p>
      <p><strong>Message:</strong> ${params.get('message')}</p>
      <p><strong>Submitted At:</strong> ${params.get('timestamp')}</p>
    `;
  }
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }
});