🍽️ Food Lovers Restaurant – Full Stack Web Application
A responsive restaurant website with table reservation functionality, email confirmation, and database storage.
The project uses a static frontend deployed on Netlify and a Node.js backend deployed on Render, with MongoDB Atlas for data persistence and Brevo (SMTP) for email notifications.

git clone https://github.com/Maheedhar2311/Restaurant.git


🚀 Live Demo
 - Frontend (Netlify): https://wonderful-monstera-5169be.netlify.app/
 - Backend API (Render): https://restaurant-hx2m.onrender.com/

📂 Project Structure
Restaurant/
│
├── FrontEnd/
│   ├── images/
│   ├── index.html
│   ├── styles.css
│   ├── responsive.css
│   └── script.js
│
├── server/
│   ├── server.js
│   ├── package.json
│   ├── package-lock.json
│   ├── .env
│   └── node_modules/
│
├── .gitignore
└── README.md

✨ Features
 🌐 Frontend
   - Fully responsive restaurant website
   - Modern UI with Swiper.js sliders
   - Dynamic menu filtering (Appetizers, Main Course, Desserts)
   - Table reservation form with client-side validation
   - Smooth animations and parallax scrolling
 ⚙️ Backend
    - REST API built with Node.js + Express
    - Reservation data stored in MongoDB Atlas
    - Email confirmation sent using Nodemailer + Brevo SMTP
    - CORS enabled for Netlify–Render communication
    - Secure environment variable handling using dotenv
 📧 Email Functionality
     - Sends booking confirmation email to the customer
     - Uses Brevo SMTP credentials
     - Reservation is saved even if email delivery fails (graceful fallback

🛠️ Tech Stack
 Frontend
   - HTML5
   - CSS3 (Responsive design)
   - JavaScript (Vanilla JS)
   - Swiper.js
   - Font Awesome
  Backend
    - Node.js
    - Express.js
    - MongoDB Atlas
    - Mongoose
    - Nodemailer
    - Brevo SMTP
  Deployment
    - Frontend: Netlify
    - Backend: Render
    - Database: MongoDB Atlas

📡 API Endpoint
Reserve a Table
POST /reserve
Request Body (JSON): 
{
  "name": "John Doe",
  "contact": "9876543210",
  "email": "john@example.com",
  "persons": 4,
  "date": "2025-01-20",
  "time": "7:30 PM",
  "message": "Window seat preferred"
}
Response:
{
  "success": true
}


