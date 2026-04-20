<div align="center">
  <img src="https://raw.githubusercontent.com/ajaynukala/UNIverse/main/universe-frontend/public/vite.svg" alt="UNIverse Logo" width="120" />
  <h1>🚀 UNIverse</h1>
  <p><em>Gamify your learning journey and track your skills in style.</em></p>

  <!-- Badges -->
  <p>
    <img src="https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61DAFB?logo=react&logoColor=white" alt="Frontend" />
    <img src="https://img.shields.io/badge/Styling-Tailwind%20CSS-38B2AC?logo=tailwind-css&logoColor=white" alt="Tailwind" />
    <img src="https://img.shields.io/badge/Backend-Spring%20Boot-6DB33F?logo=spring&logoColor=white" alt="Backend" />
    <img src="https://img.shields.io/badge/Database-MySQL-4479A1?logo=mysql&logoColor=white" alt="MySQL" />
  </p>
</div>

---

## 🌟 About UNIverse
UNIverse is a full-stack, highly interactive web application designed to help university students and lifelong learners track their skill progression. It transforms the mundane task of learning into an engaging, gamified experience where users can earn XP, level up, and conquer interactive learning roadmaps.

## ✨ Features
*   **Authentication & Security:** Secure JWT-based login and registration.
*   **Dynamic Roadmaps:** Visual skill trees for tracking progress in various disciplines (e.g., UI/UX, Backend, Frontend).
*   **Gamified Dashboard:** Earn points, level up, and track "Active Quests" on a personalized dashboard.
*   **Rich UI/UX:** Built with Tailwind CSS and Framer Motion for beautiful, fluid micro-animations.
*   **Dark Mode:** Seamless light and dark mode toggling.

## 🛠️ Tech Stack
### **Frontend**
*   **React (Vite)** for a lightning-fast development experience.
*   **Tailwind CSS** for modern, responsive utility-class styling.
*   **Zustand** for lightweight global state management.
*   **Framer Motion** for butter-smooth animations.
*   **Axios** for API communication.

### **Backend**
*   **Java Spring Boot 3** for a robust, scalable REST API.
*   **Spring Security & JWT** for stateless authentication.
*   **Spring Data JPA / Hibernate** for database interactions.
*   **MySQL** for persistent relational data storage.

---

## 🚀 Getting Started Locally

### Prerequisites
Make sure you have the following installed on your machine:
*   [Node.js](https://nodejs.org/) (v18+)
*   [Java JDK](https://www.oracle.com/java/technologies/downloads/) (v17+)
*   [MySQL](https://www.mysql.com/)

### 1. Database Setup
1. Open your MySQL client and create a new database:
```sql
CREATE DATABASE universe_app;
```
2. Verify your credentials. By default, the backend looks for username `root` and password `rootuser`. You can change these in `application.properties`.

### 2. Backend Setup
1. Navigate to the backend directory:
```bash
cd universe-backend
```
2. Run the Spring Boot application using Gradle:
```bash
./gradlew bootRun
```
*The server will start on `http://localhost:8080`. (Note: The database tables will be created automatically!)*

### 3. Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
```bash
cd universe-frontend
```
2. Install dependencies:
```bash
npm install
```
3. Start the development server:
```bash
npm run dev
```
*The app will open at `http://localhost:5173`.*

---

## ☁️ Deployment
UNIverse is production-ready! 
- **Frontend** can be deployed seamlessly to Vercel or Netlify.
- **Backend** can be hosted on Render or Koyeb.
- **Database** can be managed via Aiven or TiDB.

*(Ensure you set the `VITE_API_URL` environment variable on your frontend, and `SPRING_DATASOURCE_URL` on your backend during deployment).*

---
<div align="center">
  <i>Built with ❤️ for learners everywhere.</i>
</div>
