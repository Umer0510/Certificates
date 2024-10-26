const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');

// Replace with your Apps Script web app URL
const sheetUrl = 'https://script.google.com/macros/s/AKfycbxmvILtzf2n1Nv8YtiMb9QX2WzqDh0lfZ5Avfh0RV7p2ySlv0ITasP2QT9xzFVRp_8s/exec';

async function fetchAuthorizedEmails() {
  const response = await fetch(`${sheetUrl}?action=getAuthorizedEmails`);
  return await response.json();
}

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const email = document.getElementById('email').value.trim();

  const users = await fetchAuthorizedEmails();
  const authorizedUser = users.find(user => user.email.toLowerCase() === email.toLowerCase());

  if (authorizedUser) {
    alert('Access granted!');
    window.location.href = 'protected-page.html'; // Redirect to the protected page
  } else {
    errorMessage.textContent = 'Unauthorized access!';
  }
});
