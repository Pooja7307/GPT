const username = localStorage.getItem("user");

if (!username) {
  alert("Please login first.");
  window.location.href = "index.html";
}

const chatContainer = document.getElementById("chat-container");
const chatHistoryList = document.getElementById("chat-history-list");
const messageInput = document.getElementById("message-input");

let chatHistory = JSON.parse(localStorage.getItem(`chatHistory_${username}`)) || [];

chatHistory.forEach(msg => {
  appendMessage(msg.text, msg.sender);
  addToHistoryList(msg.text, msg.sender);
});

function sendMessage() {
  const message = messageInput.value.trim();
  if (!message) return;

  appendMessage(message, "user");
  saveMessage(message, "user");
  messageInput.value = "";

  setTimeout(() => {
    const reply = generateReply(message);
    appendMessage(reply, "Ask GPT");
    saveMessage(reply, "Ask GPT");
  }, 500);
}

function appendMessage(text, sender) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  msg.textContent = text;
  chatContainer.appendChild(msg);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

function addToHistoryList(text, sender) {
  const div = document.createElement("div");
  div.textContent = `${sender === "user" ? "You" : "AskMate"}: ${text}`;
  chatHistoryList.appendChild(div);
}

function saveMessage(text, sender) {
  chatHistory.push({ text, sender });
  localStorage.setItem(`chatHistory_${username}`, JSON.stringify(chatHistory));
  addToHistoryList(text, sender);
}

function generateReply(message) {
  const msg = message.toLowerCase();
  if (msg.includes("hi") || msg.includes("hello")) return "Hi! How can I assist?";
  if (msg.includes("html")) return "HTML is HyperText Markup Language.";
  if (msg.includes("css")) return "CSS is for styling.";
  if (msg.includes("javascript")) return "JavaScript makes websites interactive.";
  return "I'm still learning. Try something else!";
}

function logout() {
  localStorage.removeItem("user");
  window.location.href = "index.html";
}

messageInput.addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});