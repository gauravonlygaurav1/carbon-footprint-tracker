
# 🌱 Carbon Footprint Tracker

![Java](https://img.shields.io/badge/Java-17%2B-orange)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-green)
![React](https://img.shields.io/badge/React-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-blue)
![JWT](https://img.shields.io/badge/JWT-Authentication-red)
![MySQL](https://img.shields.io/badge/MySQL-Database-blue)


# 🌱 Carbon Footprint Tracker

A **production-style full-stack web application** that helps users track, analyze, and reduce their carbon emission based on daily activities such as driving co2 emission, electricity usage, food consumption, and flights.

Built using **React, TypeScript, Spring Boot, Spring Security, JWT, OAuth2, Docker and MySQL**, this project demonstrates real-world full-stack engineering, secure authentication, and custom backend business logic for carbon emission calculation.

## 🚀 Key Features

### 🔐 Authentication & Security
- User registration and login system  
- Google OAuth2 authentication  
- GitHub OAuth2 authentication
- Protected frontend routes
- Spring Security backend protection
- Password encryption using BCrypt

### 🌍 Carbon Emission Tracking
- Driving CO₂ emission calculation (custom logic)  
- Electricity usage emission tracking  
- Food consumption emission calculation  
- Flight emission tracking  
- Automatic CO₂ calculation engine (no external API dependency)

### 📊 Dashboard & Analytics
- Total carbon footprint overview  
- Activity-wise emission breakdown
- Weekly emission trends
- Interactive charts and analytics  
- Goal tracking system

### ⚡ Full-Stack Features
- Real-time API communication (with Axios)
- Secure token-based API calls
- Responsive UI for all devices
- Clean separation of frontend & backend  

## 📸 Screenshots

### Home Page
![Home Page](screenshots/Home.PNG)

### Signup
![Signup Page](screenshots/SignUp.PNG)

### Dashboard
![Dashboard Page](screenshots/Dashboard.PNG)

### Emission Calculation
![Co2 Emission](screenshots/Emission.PNG)

### Analytics
![Analytics1 Page](screenshots/Analytics1.PNG)
![Analytics2 Page](screenshots/Analytics2.PNG)

### Goal Tracking
![Goal Page](screenshots/Goals.PNG)

### Profile
![Profile Page](screenshots/Profile.PNG)

### Live Demo
![Demo](screenshots/demo.gif)

## 🧠 System Architecture

[Frontend (React + TypeScript)]-> [Axios API Calls]-> [Spring Boot Backend
API]-> [JWT Authentication Filter]-> [Business Logic]-> [MySQL Database]

### Flow Explanation
- The frontend communicates with the backend using secure REST APIs built with Spring Boot
- Every protected request includes a JWT access token in the Authorization header
- The JWT Authentication Filter validates the token before allowing access to any secured endpoint
- Once authenticated, the request moves to the Carbon Calculation Engine, where CO₂ emissions are calculated based on activity type (driving, electricity, food, etc.)
- The calculated emission data is then stored in the MySQL database for history, analytics, and dashboard visualization
- The backend sends a structured response back to the frontend, which updates the UI in real time

## 🛠️ Tech Stack

### Frontend
- React (TypeScript)  
- Tailwind CSS
- Tailwind CSS
- Axios
- React Router
- Recharts (Charts & Analytics)  

### Backend
- Java 21
- Spring Boot 
- Spring Security 
- JWT Authentication  
- OAuth2 (Google & GitHub)  
- JPA / Hibernate  
- MySQL 

## 📂 Project Structure

### Backend
- controller → REST APIs
- service → Business logic (carbon calculations)
- repository → Database layer
- entity → Database models
- dto's → Request/Response models
- security → JWT configuration
- exception → Global exception handling

### Frontend
- components → UI components
- pages → Application pages
- services → API calls (Axios)
- store -> Zustand Store
- charts → Analytics components

## 🚀 Setup & Run

### 1️⃣ Clone Repository

git clone https://github.com/gauravonlygaurav1/carbon-footprint-tracker  
cd carbon-footprint-tracker

### 2️⃣ Backend Setup

```bash
cd carbon_tracker_backend
mvn spring-boot:run  
```
Configure DB in application-dev.yml

### 3️⃣ Frontend Setup

```bash
cd carbon_tracker_frontend
npm install
npm run dev  
```
Frontend runs on: http://localhost:5173

## 🌐 Live Demo

**Frontend:** https://carbon-footprint-tacker.netlify.app/

**Backend:** https://carbon-footprint-tracker-iyh1.onrender.com

## 🎯 Future Improvements

- AI-based carbon reduction suggestions
- Leaderboard system (gamification)
- Mobile app (React Native)
- Cloud deployment (AWS)
- Social sharing of progress

## 👨‍💻 Author

**Gaurav**

**Java Full-Stack Developer**

**Spring Boot • React • System Design**
