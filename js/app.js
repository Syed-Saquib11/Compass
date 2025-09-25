// js/app.js

const questionContainer = document.getElementById("question-container");
const resultContainer = document.getElementById("result-container");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const bookTitleEl = document.getElementById("book-title");
const bookDescriptionEl = document.getElementById("book-description");
const restartBtn = document.getElementById("restart-btn");
const backBtn = document.getElementById("back-btn");
const backBtnResult = document.getElementById("back-btn-result");

let currentNodeKey = "0";
let quizData = {};
let bookData = {};
let history = [];

async function loadQuizData() {
  try {
    console.log("Fetching quiz data...");
    const quizResponse = await fetch("data/quizdata.json");
    if (!quizResponse.ok) throw new Error("Quiz data fetch failed");
    quizData = await quizResponse.json();
    console.log("Quiz data loaded.");

    console.log("Fetching book data...");
    const booksResponse = await fetch("data/books.json");
    if (!booksResponse.ok) throw new Error("Book data fetch failed");
    bookData = await booksResponse.json();
    console.log("Book data loaded.");

    startQuiz();
  } catch (error) {
    console.error("Error loading data:", error);
    alert("Error loading quiz or book data. Check console.");
  }
}

function startQuiz() {
  currentNodeKey = "0";
  history = [];
  resultContainer.classList.add("hidden");
  questionContainer.classList.remove("hidden");
  updateBackButton();
  updateBackButtonResult();
  showQuestion(currentNodeKey, false);
}

function showQuestion(nodeKey, pushToHistory = true) {
  console.log("Showing node:", nodeKey);

  if (pushToHistory && currentNodeKey && currentNodeKey !== nodeKey && quizData[currentNodeKey]?.question) {
    history.push(currentNodeKey);
  }

  currentNodeKey = nodeKey;

  updateBackButton();
  updateBackButtonResult();

  const node = quizData[nodeKey];

  // Book recommendation
  if (!node) {
    const book = bookData[nodeKey];
    if (!book) {
      console.warn("No book found for key:", nodeKey);
      return;
    }

    questionContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");

    bookTitleEl.textContent = book.title;
    bookDescriptionEl.textContent = `${book.description} — by ${book.author}`;

    const oldCover = document.querySelector(".book-cover");
    if (oldCover) oldCover.remove();

    if (book.cover) {
      const img = document.createElement("img");
      img.src = book.cover;
      img.alt = book.title;
      img.classList.add("book-cover");
      bookTitleEl.parentNode.insertBefore(img, bookTitleEl);
    }

    // Remove any old secondary button
    const oldSecondary = document.getElementById("secondary-btn");
    if (oldSecondary) oldSecondary.remove();

    // Add secondary recommendation button if present
    if (book.secondary) {
      const secondaryBtn = document.createElement("button");
      secondaryBtn.id = "secondary-btn";
      secondaryBtn.className = "option-button";
      secondaryBtn.textContent = book.secondary.text;
      secondaryBtn.onclick = () => showQuestion(book.secondary.next, false);
      restartBtn.parentNode.insertBefore(secondaryBtn, restartBtn);
    }
    return;
  }

  // Quiz question
  if (node.question) {
    questionEl.textContent = node.question;
    optionsEl.innerHTML = "";

    node.options.forEach(option => {
      const button = document.createElement("button");
      button.classList.add("option-button");
      button.textContent = option.text;
      button.addEventListener("click", () => {
        console.log("Clicked:", option.next);
        showQuestion(option.next); // No history push flag - default true
      });
      optionsEl.appendChild(button);
    });
  }
}

function updateBackButton() {
  const showBack = history.length > 0 && quizData[currentNodeKey];
  if (showBack) {
    backBtn.classList.remove("hidden");
  } else {
    backBtn.classList.add("hidden");
  }
}

function updateBackButtonResult() {
  const showBackResult = history.length > 0 && !quizData[currentNodeKey];
  if (showBackResult) {
    backBtnResult.classList.remove("hidden");
  } else {
    backBtnResult.classList.add("hidden");
  }
}

function goBack() {
  if (history.length > 0) {
    if (!quizData[currentNodeKey]) {
      resultContainer.classList.add("hidden");
      questionContainer.classList.remove("hidden");
    }
    currentNodeKey = history.pop();
    showQuestion(currentNodeKey, false);
  }
}

restartBtn.addEventListener("click", startQuiz);
backBtn.addEventListener("click", goBack);
if (backBtnResult) backBtnResult.addEventListener("click", goBack);

loadQuizData();

