function renderUserMenu() {
  const authSection = document.getElementById('authSection');
  const loggedIn = localStorage.getItem('loggedInUser') || sessionStorage.getItem('loggedInUser');

  if (!loggedIn) {
    authSection.innerHTML = `
        <div class="user-info" id="userInfo">
          <a href="/website-topup/html/login.html" class="btn-log">Masuk</a>
          <a href="/website-topup/html/register.html" class="btn-daftar">Daftar</a>
        </div>
      `;
    return;
  }

  const user = JSON.parse(loggedIn);

  authSection.innerHTML = `
      <div class="user-info" id="userInfoLoggedIn">
        <button class="user-button" id="userButton">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-user-icon lucide-circle-user"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="10" r="3"/><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"/></svg>
          <span id="usernameDisplay">${user.username}</span>
        </button>
        <div class="user-dropdown" id="userDropdown" style="display: none;">
          <button id="logoutButton">Logout</button>
        </div>
      </div>
    `;

  document.getElementById('userButton').addEventListener('click', (event) => {
    event.stopPropagation();
    const dropdown = document.getElementById('userDropdown');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
  });

  document.getElementById('logoutButton').addEventListener('click', () => {
    localStorage.removeItem('loggedInUser');
    sessionStorage.removeItem('loggedInUser');
    window.location.reload();
  });

  document.getElementById('userButton').addEventListener('click', (event) => {
    event.stopPropagation();
    const dropdown = document.getElementById('userDropdown');
    dropdown.classList.toggle('show');
  });

}

document.addEventListener('DOMContentLoaded', renderUserMenu);
