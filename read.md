# 📚 Compass – Book Recommendation Quiz

A simple interactive quiz that helps users discover their next read (Fantasy or Sci-Fi).  
Built with **HTML, CSS, and Vanilla JavaScript** using a **JSON-driven quiz flow**.

---

## 🎨 Design Guidelines

### Color Palette
- **Background:** `#FAF9F6` (off-white / cream)  
- **Primary Text:** `#222222` (dark gray)  
- **Accent Color:** `#6A5ACD` (slate blue – for buttons/active states)  
- **Secondary Accent:** `#FFD700` (gold – for highlights, hover states, or emphasis)  
- **Error/Alert (optional):** `#E63946` (red)

### Fonts
- **Primary Font:** `Poppins` (Google Fonts)  
- **Fallbacks:** `Segoe UI`, `Roboto`, `Arial`, `sans-serif`  
- **Font Sizes:**  
  - Question Text: `20px – 24px` (bold)  
  - Options/Buttons: `16px – 18px`  
  - Recommendation Result: `22px` (slightly larger, bold)  

### Spacing
- Line-height: `1.5`  
- Section padding: `20px`  
- Button padding: `10px 16px`  

---

## 🛠️ Project Structure

compass/
│
├── index.html             # Main HTML page for the quiz app
├── README.md              # Project overview and instructions
│
├── css/                   # Stylesheets
│   └── styles.css         # Main CSS file
│
├── js/                    # JavaScript files
│   ├── app.js             # Core quiz logic & interaction
│   └── dataLoader.js      # (Optional) JSON fetch and parsing logic
│
├── data/                  # JSON and other data files
│   └── quizData.json      # Quiz questions, options, flow, book info
│
├── assets/                # Static assets (images, icons, fonts)
│   ├── images/            # Book covers, decorative images
│   └── icons/             # UI icons
│
└── backend/               # (Optional) Backend project files (Node.js/Express)
    ├── server.js          # Backend server entry point
    ├── routes/            # API route handlers
    ├── models/            # Database models or schemas
    └── config/            # Environment configs and DB connections

---

## 📂 JSON Template

```json
{
  "questions": [
    {
      "id": "q1",
      "text": "Do you want a fantasy or sci-fi book?",
      "options": [
        { "text": "Fantasy", "next": "q2" },
        { "text": "Sci-Fi", "next": "q3" }
      ]
    },
    {
      "id": "q2",
      "text": "Do you like epic quests?",
      "options": [
        { "text": "Yes", "next": "book1" },
        { "text": "No", "next": "book2" }
      ]
    }
  ],
  "books": [
    { "id": "book1", "title": "The Lord of the Rings" },
    { "id": "book2", "title": "The Name of the Wind" }
  ]
}

---

## Usage
Clone or download this repository.

Open index.html in any modern browser.

The quiz will load dynamically from questions.json.

Click through the quiz to get a book recommendation.

📱 Responsive Design
Works on desktop, tablet, and mobile.

Quiz container centered with a max-width of 600px.

Buttons are full-width on mobile and aligned horizontally on desktop.

📋 To-Do (Future Improvements)
Add animations/transitions for question changes.

Add book cover images in recommendations.

Store quiz progress using localStorage.

Add a restart button at the end of the quiz.