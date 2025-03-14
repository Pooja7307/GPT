

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");
  
    if (loginForm) {
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
  
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
  
        if (!validateEmail(email)) {
          alert(" Please enter a valid email address.");
          return;
        }
  
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const existingUser = users.find(user => user.email === email && user.password === password);
  
        if (!existingUser) {
          alert(" Invalid email or password. Please try again or sign up.");
          return;
        }
  
        localStorage.setItem("user", JSON.stringify({ email }));
  
        alert("Login successful!");
        window.location.href = "chat.html";
      });
    }
  
    if (signupForm) {
      signupForm.addEventListener("submit", (e) => {
        e.preventDefault();
  
        const email = document.getElementById("signup-email").value.trim();
        const password = document.getElementById("signup-password").value.trim();
  
        if (!validateEmail(email)) {
          alert("Enter a valid email address.");
          return;
        }
  
        if (password.length < 4) {
          alert("Password must be at least 4 characters.");
          return;
        }
  
        let users = JSON.parse(localStorage.getItem("users")) || [];
        const userExists = users.find(user => user.email === email);
  
        if (userExists) {
          alert("Email already registered! Please log in.");
          return;
        }
  
        users.push({ email, password });
        localStorage.setItem("users", JSON.stringify(users));
  
        alert(" Account created successfully! Please log in.");
        window.location.href = "index.html";
      });
    }  function login() {
      const username = document.getElementById("username").value.trim();
      if (!username) {
        alert("Please enter your username.");
        return;
      }

     
      localStorage.setItem("user", username);

      window.location.href = "chat.html";
    }
  
    
    function validateEmail(email) {
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return pattern.test(email);
    }
  });
  