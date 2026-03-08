 // User profile object (equivalent to your C struct)
let profile = {
  name: "",
  age: "",
  country: "",
  pet: "",
  favoriteMovie: "",
  userPassword: "",
  generatedPassword: ""
};
function guestLogin() {
  alert("You are now using the notebook as a guest. Entries will be temporary.");
  
  // Mark as guest (optional, if you want to hide account info)
  profile.name = "Guest";
  profile.userPassword = "";
  profile.generatedPassword = "";

  // Show the notebook
  showStep("diary");

  // Clear any previous localStorage (so guest entries are temporary)
  localStorage.removeItem("diaryEntries");
}
window.onload = function() {
  if (localStorage.getItem("loggedIn") === "true") {
    showDiary(); 
  }
};

function generatePassword() {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";
  for (let i = 0; i < 12; i++) {
    password += charset[Math.floor(Math.random() * charset.length)];
  }
  return password;
}

function showStep(id) {
  const steps = ["step1", "step2", "step3"];
  steps.forEach(step => {
    document.getElementById(step).style.display = "none";
  });
  document.getElementById(id).style.display = "block";
}

function startAccountCreation() {
  showStep("step1");
}


function createAccount() {
  profile.name = document.getElementById("name").value;
  profile.age = document.getElementById("age").value;
  profile.country = document.getElementById("country").value;
  profile.pet = document.getElementById("pet").value;
  profile.favoriteMovie = document.getElementById("movie").value;
  profile.userPassword = document.getElementById("password").value;

  profile.generatedPassword = generatePassword();

  alert("Account created! Your generated password: " + profile.generatedPassword);

  showStep("step2");
}


function verifyUser() {
  let checkName = document.getElementById("checkName").value;
  let checkCountry = document.getElementById("checkCountry").value;
  let checkMovie = document.getElementById("checkMovie").value;

  if (
    checkName === profile.name &&
    checkCountry === profile.country &&
    checkMovie === profile.favoriteMovie
  ) {
    alert("Verification successful!");
    showStep("step3");
  } else {
    alert("Access denied. Try again.");
  }
}


function login() {
  let enteredPassword = document.getElementById("fullPassword").value;
  let fullPassword = profile.userPassword + profile.generatedPassword;
localStorage.setItem("loggedIn", "true");
if (enteredPassword === fullPassword) {
  alert("Full access granted! Welcome to your notebook.");
  localStorage.setItem("loggedIn", "true"); 
  showDiary();
} else {
  alert("Incorrect password. Try again.");
}
  if (enteredPassword === fullPassword) {
    alert("Full access granted! You can now write in your diary.");
  
  } else {
    alert("Incorrect password. Try again.");
  }
}

function showDiary() {
  showStep("diary");  // Shows the notebook div
  loadDiary();
}

// Save diary entry
function saveDiary() {
  const diaryInput = document.getElementById("diaryInput").value;
  if (!diaryInput) return;

  // Get previous entries from localStorage
  let entries = JSON.parse(localStorage.getItem("diaryEntries") || "[]");

  entries.push(diaryInput);
  localStorage.setItem("diaryEntries", JSON.stringify(entries));

  document.getElementById("diaryInput").value = "";
  loadDiary();
}

// Load and display entries
function loadDiary() {
  const entriesDiv = document.getElementById("entries");
  const entries = JSON.parse(localStorage.getItem("diaryEntries") || "[]");

  entriesDiv.innerHTML = "";
  entries.forEach((entry, index) => {
    const p = document.createElement("p");
    p.textContent = `${index + 1}. ${entry}`;
    entriesDiv.appendChild(p);
  });
}


function clearDiary() {
  localStorage.removeItem("diaryEntries");
  loadDiary();
}
function logout() {
  localStorage.removeItem("loggedIn")
  showStep("start"); 
}

function login() {
  let enteredPassword = document.getElementById("fullPassword").value;
  let fullPassword = profile.userPassword + profile.generatedPassword;

  if (enteredPassword === fullPassword) {
    alert("Full access granted! Welcome to your notebook.");
    showDiary();  // Show notebook step
  } else {
    alert("Incorrect password. Try again.");
  }
}