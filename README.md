# Tour Recommendation System

## Overview
The Tour Recommendation System is a full-stack web application designed to help users plan, optimize, and save personalized travel itineraries. By leveraging user preferences, collaborative filtering, and geolocation, the system recommends places to visit, optimizes travel routes, and allows users to save and manage their tour plans.

## Problem Statement
**Travelers often struggle to plan efficient, enjoyable, and personalized tours, especially in unfamiliar cities.**
- They waste time researching places, distances, and optimal routes.
- Manual planning is tedious and often leads to suboptimal experiences.
- There is no easy way to save, revisit, or share personalized itineraries.

## Why This Problem Matters
- **Time and Experience:** Poor planning leads to wasted time, missed attractions, and less enjoyable trips.
- **Personalization:** Generic recommendations do not account for individual interests, travel style, or constraints.
- **Convenience:** Modern travelers expect seamless, tech-driven solutions for trip planning and management.

## Solution
This project provides:
- **Personalized recommendations** based on user preferences, collaborative filtering, and location.
- **Route optimization** to minimize travel time and maximize experience.
- **Tour saving and management** so users can revisit, edit, or delete their plans.
- **User-friendly dashboard** for insights and quick access to saved tours.

## Tech Stack
- **Frontend:** React.js, Tailwind CSS, React Router, Context API
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JWT (JSON Web Tokens), OAuth (Google, Facebook)
- **APIs & Services:**
  - Google Maps & Places API (for geolocation, place details, and route optimization)
  - Custom collaborative filtering and recommendation algorithms
- **Other:**
  - Framer Motion (animations)
  - ESLint, Prettier (code quality)

## Key Features
- **User Registration & Login:** Secure authentication with JWT and OAuth.
- **Personalized Recommendations:** Suggests places based on user profile, preferences, and collaborative filtering.
- **Route Optimization:** Uses TSP (Traveling Salesman Problem) algorithms and Google Maps API to optimize tour routes.
- **Tour Planning:** Users can select places, view estimated travel and stay times, and generate a complete itinerary.
- **Save & Manage Tours:** Save planned tours, view them on the Saved Tours page, and delete or update as needed.
- **Dashboard:** Visualizes user stats, recent activities, and recommended tours.
- **Admin/Analytics (optional):** View all users and their preferences (for future expansion).

## Architecture
```
Frontend (React)
  |---> API Calls (REST)
Backend (Node.js/Express)
  |---> MongoDB (Mongoose)
  |---> Google Maps/Places API
  |---> Recommendation & Optimization Services
```

## How to Run
1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd tour-recommendation-system
   ```
2. **Backend Setup:**
   - Go to the backend folder:
     ```bash
     cd backend
     npm install
     ```
   - Create a `.env` file with your MongoDB URI and Google Maps API key.
   - Start the backend:
     ```bash
     npm start
     ```
3. **Frontend Setup:**
   - Open a new terminal, go to the frontend folder:
     ```bash
     cd ../frontend
     npm install
     ```
   - Create a `.env.local` file with your Google OAuth client ID.
   - Start the frontend:
     ```bash
     npm start
     ```
4. **Access the app:**
   - Frontend: [http://localhost:3005](http://localhost:3005) (or your configured port)
   - Backend: [http://localhost:5002](http://localhost:5002)

## Methods & Algorithms
- **Collaborative Filtering:** Recommends places based on similar users' preferences and ratings.
- **Geospatial Filtering:** Finds places within a user-defined radius using the Haversine formula.
- **Route Optimization:** Solves the TSP for selected places to minimize travel time.
- **User Profile Learning:** Adapts recommendations as users interact with the system.

## Future Improvements
- Social sharing of tours
- Real-time traffic-aware route optimization
- Integration with booking APIs
- Mobile app version

## Authors & Contributors
- [Your Name]
- [Contributors...]

## License
MIT 