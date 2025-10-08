const randomBtn = document.getElementById('random-btn');
const resultBox = document.getElementById('random-result');
const heading = document.querySelector('.random-container h1');       // Select heading
const subheading = document.querySelector('.random-container p');      // Select subheading
const button = randomBtn;                                              // The "Surprise Me!" button

let randomBookData = {};

async function loadBooks() {
  const res = await fetch('data/books.json');
  randomBookData = await res.json();
}

function pickRandomBook() {
  const keys = Object.keys(randomBookData);
  if (!keys.length) return null;
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  return randomBookData[randomKey];
}

// function showRandomBook() {
//   const book = pickRandomBook();
//   if (!book) return;

//   // Hide heading, subheading, and button
//   if (heading) heading.style.display = 'none';
//   if (subheading) subheading.style.display = 'none';
//   if (button) button.style.display = 'none';

//   // Show the book suggestion
//   resultBox.innerHTML = `
//     <h2>Book Suggestion</h2>
//     ${book.cover ? `<img src="${book.cover}" alt="${book.title}" class="book-cover" />` : ""}
//     <h3>${book.title}</h3>
//     <p>${book.description} — <em>${book.author}</em></p>
//   `;
//   resultBox.classList.remove('hidden');
// }

// randomBtn.addEventListener('click', showRandomBook);

// loadBooks();

function showRandomBook() {
  const book = pickRandomBook();
  if (!book) return;

  // Hide heading, subheading, and "Surprise Me!" button
  if (heading) heading.style.display = 'none';
  if (subheading) subheading.style.display = 'none';
  if (button) button.style.display = 'none';

  // Show suggestion box, including "Try Again" at the bottom
  resultBox.innerHTML = `
    <h2>Book Suggestion</h2>
    ${book.cover ? `<img src="${book.cover}" alt="${book.title}" class="book-cover" />` : ""}
    <h3>${book.title}</h3>
    <p>${book.description} — <em>${book.author}</em></p>
    <button id="try-again-btn" class="main-action" style="margin-top: 1rem;">Try Again?</button>
  `;
  resultBox.classList.remove('hidden');

  // Dynamically add an event listener for Try Again button
  const tryAgainBtn = document.getElementById('try-again-btn');
  tryAgainBtn.addEventListener('click', showRandomBook);
}

randomBtn.addEventListener('click', showRandomBook);

loadBooks();
