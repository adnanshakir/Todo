// Registration / Auth elements
const authSection = document.querySelector("#auth-section");
const form = document.querySelector("#form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const passInput = document.querySelector("#pass");
const submitBtn = document.querySelector("#submit-btn");
const taskBtn = document.querySelector("#taskbtn");

//  Feedback elements inside form
const errorTexts = document.querySelectorAll(".error");
const passStrength = document.querySelector(".pass-strength");

//  To-Do Section elements
const todoSection = document.querySelector("#todo-section");
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");

// Logout
const logoutBtn = document.querySelector("#logout-btn");
const savedUser = JSON.parse(localStorage.getItem("user"));

const userNameDisplay = document.querySelector("#user-name");
if (savedUser) {
  showTodoSection(savedUser);
}

// 👋 User greeting area
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const valid = formValidation();

  if (valid) {
    const user = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      password: passInput.value.trim(),
    };

    localStorage.setItem("user", JSON.stringify(user));

    showTodoSection(user);
  }
});

function formValidation() {
  let isValid = true;

  const nameVal = nameInput.value.trim();
  const emailVal = emailInput.value.trim();
  const passVal = passInput.value.trim();

  // Name check
  if (nameVal === "" || nameVal.length < 3) {
    setError(nameInput, "Name must be at least 3 characters long");
    isValid = false;
  } else {
    clearError(nameInput);
  }

  // Email check
  if (emailVal === "" || !isValidEmail(emailVal)) {
    setError(emailInput, "Please enter a valid email");
    isValid = false;
  } else {
    clearError(emailInput);
  }

  // Password check
  const passRegex =
    /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).{8,}$/;
  if (passVal === "" || !passRegex.test(passVal)) {
    setError(
      passInput,
      "Password must include A-Z, a-z, 0-9, and a special character"
    );
    isValid = false;
  } else {
    clearError(passInput);
  }

  return isValid;
}

function setError(input, msg) {
  const formControl = input.parentElement;
  const errorDisplay = formControl.querySelector(".error");
  errorDisplay.textContent = msg;
}

function clearError(input) {
  const formControl = input.parentElement;
  const errorDisplay = formControl.querySelector(".error");
  errorDisplay.textContent = "";
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showTodoSection(user) {
  authSection.classList.add("hidden");
  todoSection.classList.remove("hidden");

  userNameDisplay.textContent = user.name || "User";
}


todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let task = todoInput.value.trim();

  if (task !== "") {
    createLi(task);
    todoInput.value = "";
  } else {
    todoInput.value = "";
  }
});

function createLi(taskText) {
  const li = document.createElement("li");

  li.innerHTML = `<div class="liDiv"><div><input type='checkbox'> <p>${taskText}</p></div> <div><i class="ri-delete-bin-5-line deleteBtn"></i></div> </div>`;
  todoList.appendChild(li);
}

todoList.addEventListener("change", (e) => {
  if (e.target.type === "checkbox") {
    e.target.closest("li").classList.toggle("completed");
  }
});

todoList.addEventListener("click", (e) => {
  const deleteBtn = e.target.closest(".deleteBtn");

  if (!deleteBtn) return;
  const li = deleteBtn.closest("li");
  if (li) li.remove();
});

logoutBtn.addEventListener("click", (e)=>{
  localStorage.removeItem("user");
  todoList.innerHTML = "";
  todoSection.classList.add("hidden");
  authSection.classList.remove("hidden");
  form.reset();
  nameInput.focus();
})