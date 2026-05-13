/**
 * NAVIGATION LOGIC
 */
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    if (navLinks) {
        navLinks.classList.toggle('active');
    }
}

/**
 * AUTHENTICATION LOGIC (Login & Sign Up)
 */
function getUsers() {
    const users = localStorage.getItem('userList');
    return users ? JSON.parse(users) : [];
}

// Function to toggle between Sign Up and Login views in signin.html
function toggleForm() {
    const signup = document.getElementById('signupSection');
    const login = document.getElementById('loginSection');
    const msg = document.getElementById('message');

    if (msg) msg.textContent = ""; 
    
    if (signup && login) {
        if (signup.style.display === "none") {
            signup.style.display = "block";
            login.style.display = "none";
        } else {
            signup.style.display = "none";
            login.style.display = "block";
        }
    }
}

// Handle Sign Up
const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const user = document.getElementById('newUsername').value;
        const pass = document.getElementById('newPassword').value;
        const allUsers = getUsers();

        if (allUsers.some(u => u.username === user)) {
            alert("Username already exists.");
        } else {
            allUsers.push({ username: user, password: pass });
            localStorage.setItem('userList', JSON.stringify(allUsers));
            alert("Account created! Please log in.");
            toggleForm();
        }
    });
}

// Handle Login
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const userIn = document.getElementById('loginUsername').value;
        const passIn = document.getElementById('loginPassword').value;
        const allUsers = getUsers();

        const matchedUser = allUsers.find(u => u.username === userIn && u.password === passIn);
        if (matchedUser) {
            localStorage.setItem('loggedInUser', userIn);
            alert("Welcome back, " + userIn + "!");
            window.location.href = "index.html"; 
        } else {
            alert("Invalid username or password.");
        }
    });
}

/**
 * EVENT SYSTEM LOGIC (search.html)
 */
let events = JSON.parse(localStorage.getItem('mySavedEvents')) || [];

function addEvent() {
    const title = document.getElementById('eventTitle')?.value;
    const host = document.getElementById('hostName')?.value;
    const loc = document.getElementById('location')?.value;
    const age = document.getElementById('ageRange')?.value;
    const time = document.getElementById('eventTime')?.value;
    const desc = document.getElementById('eventDesc')?.value;

    if (!title || !loc) return alert("Please fill in the Event Name and Location.");

    const newEvent = {
        id: Date.now(),
        title, host, location: loc, age, time, description: desc
    };

    events.push(newEvent);
    localStorage.setItem('mySavedEvents', JSON.stringify(events));
    alert("Event posted!");
    clearInputs();
    runSearch();
}

function runSearch() {
    const query = document.getElementById('searchInput')?.value.toLowerCase() || "";
    const resultsDiv = document.getElementById('results');
    if (!resultsDiv) return;

    resultsDiv.innerHTML = "";
    const filtered = events.filter(ev => 
        ev.title.toLowerCase().includes(query) || 
        ev.location.toLowerCase().includes(query)
    );

    filtered.forEach(ev => {
        const div = document.createElement('div');
        div.className = "box";
        div.style.cursor = "pointer";
        div.innerHTML = `<strong>${ev.title}</strong><br><small>${ev.location}</small>`;
        div.onclick = () => showPopup(ev);
        resultsDiv.appendChild(div);
    });
}

function clearInputs() {
    document.querySelectorAll('input, textarea').forEach(input => input.value = "");
}

// Ensure results are loaded if on the search page
if (document.getElementById('results')) {
    runSearch();
}

// 1. MOBILE MENU TOGGLE
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    if (navLinks) {
        navLinks.classList.toggle('active');
    }
}

// 2. AUTHENTICATION HELPERS
function getUsers() {
    const users = localStorage.getItem('userList');
    return users ? JSON.parse(users) : [];
}

function toggleForm() {
    const signup = document.getElementById('signupSection');
    const login = document.getElementById('loginSection');
    if (signup && login) {
        signup.style.display = signup.style.display === "none" ? "block" : "none";
        login.style.display = login.style.display === "none" ? "block" : "none";
    }
}

// 3. EVENT SYSTEM
let events = JSON.parse(localStorage.getItem('mySavedEvents')) || [];

function addEvent() {
    const title = document.getElementById('eventTitle')?.value;
    const loc = document.getElementById('location')?.value;
    const host = document.getElementById('hostName')?.value;
    const desc = document.getElementById('eventDesc')?.value;

    if (!title || !loc) return alert("Please enter a Title and Location.");

    const newEvent = { id: Date.now(), title, location: loc, host, description: desc };
    events.push(newEvent);
    localStorage.setItem('mySavedEvents', JSON.stringify(events));
    alert("Event Posted!");
    location.reload(); // Refresh to show new event
}

function runSearch() {
    const query = document.getElementById('searchInput')?.value.toLowerCase() || "";
    const resultsDiv = document.getElementById('results');
    if (!resultsDiv) return;

    resultsDiv.innerHTML = "";
    events.filter(ev => ev.title.toLowerCase().includes(query)).forEach(ev => {
        const card = document.createElement('div');
        card.className = "box";
        card.innerHTML = `<h3>${ev.title}</h3><p>${ev.location}</p>`;
        resultsDiv.appendChild(card);
    });
}
