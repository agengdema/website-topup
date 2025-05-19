const USER_KEY = 'gameUsers';
const LOGGED_IN_KEY = 'loggedInUser';

function showMessage(container, message, isSuccess) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `alert ${isSuccess ? 'alert-success' : 'alert-error'}`;
    messageDiv.textContent = message;

    const formContainer = document.querySelector(container === 'register' ? '.game-reg-container' : '.game-login-container');
    const existingAlert = formContainer.querySelector('.alert');

    if (existingAlert) {
        formContainer.removeChild(existingAlert);
    }

    formContainer.insertBefore(messageDiv, formContainer.firstChild);

    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 3000);
}

function setupRegistration() {
    const regForm = document.getElementById('registrationForm');
    if (!regForm) return;

    regForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const userData = {
            name: document.getElementById('name').value.trim(),
            username: document.getElementById('username').value.trim(),
            email: document.getElementById('email').value.trim(),
            whatsapp: document.getElementById('whatsapp').value.trim(),
            password: document.getElementById('password').value,
            createdAt: new Date().toISOString()
        };

        if (userData.password !== document.getElementById('confirm-password').value) {
            showMessage('register', 'Passwords do not match!', false);
            return;
        }

        const existingUsers = JSON.parse(localStorage.getItem(USER_KEY)) || [];

        if (existingUsers.some(user => user.username === userData.username)) {
            showMessage('register', 'Username already exists!', false);
            return;
        }

        existingUsers.push(userData);
        localStorage.setItem(USER_KEY, JSON.stringify(existingUsers));

        showMessage('register', 'Registration successful! Please login.', true);
        regForm.reset();

        console.log('Data tersimpan:', JSON.parse(localStorage.getItem(USER_KEY)));
    });
}

function setupLogin() {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return;

    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('remember').checked;

        const existingUsers = JSON.parse(localStorage.getItem(USER_KEY)) || [];
        const user = existingUsers.find(u => u.username === username);

        if (!user) {
            showMessage('login', 'Username not found!', false);
            return;
        }

        if (user.password !== password) {
            showMessage('login', 'Incorrect password!', false);
            return;
        }

        // Login sukses
        showMessage('login', 'Login successful! Redirecting...', true);

        const sessionData = {
            username: username,
            lastLogin: new Date().toISOString()
        };

        if (rememberMe) {
            localStorage.setItem(LOGGED_IN_KEY, JSON.stringify(sessionData));
        } else {
            sessionStorage.setItem(LOGGED_IN_KEY, JSON.stringify(sessionData));
        }

        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    });
}

function checkLoggedIn() {
    const savedUser = localStorage.getItem(LOGGED_IN_KEY) || sessionStorage.getItem(LOGGED_IN_KEY);
    if (savedUser) {
        window.location.href = 'index.html';
    }
}

document.addEventListener('DOMContentLoaded', function () {
    checkLoggedIn();
    setupRegistration();
    setupLogin();

    console.log('Registered Users:', JSON.parse(localStorage.getItem(USER_KEY)) || 'Tidak ada data');
    console.log('Logged In User:', JSON.parse(localStorage.getItem(LOGGED_IN_KEY)) || JSON.parse(sessionStorage.getItem(LOGGED_IN_KEY)) || 'Belum login');
});