# Tour Recommendation System Web Application

## Project Overview
Tour Recommendation System is a full-stack web application that helps users discover, plan, and manage personalized tours based on their preferences. Users can register, log in (including with Google), set their travel preferences, explore destinations, and generate optimized tour plans.

## Features
- User registration and authentication (including Google OAuth)
- Personalized tour recommendations
- Explore and search for destinations
- Save and manage tour plans
- Interactive map integration
- User profile and preferences management

## Tech Stack
- **Frontend:** React, React Router, Context API, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **APIs:** Google Maps, Google Places
- **Authentication:** JWT, Google OAuth

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repo-url>
cd tour-recommendation-system
```

### 2. Backend Setup
```bash
cd backend
npm install
```
- Create a `.env` file in the `backend` directory with the following variables:
  ```env
  GOOGLE_MAPS_API_KEY=your_google_maps_api_key
  GOOGLE_CLIENT_ID=your_google_client_id
  MONGODB_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret
  PORT=5002
  ```
- Start the backend server:
```bash
npm start
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```
- Create a `.env` file in the `frontend` directory with the following variables:
  ```env
  REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
  REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
  ```
- Start the frontend development server:
```bash
npm start
```

## Environment Variables
- **Backend:**
  - `GOOGLE_MAPS_API_KEY`: Google Maps API key
  - `GOOGLE_CLIENT_ID`: Google OAuth Client ID
  - `MONGODB_URI`: MongoDB connection string
  - `JWT_SECRET`: Secret for JWT authentication
  - `PORT`: Backend server port (default: 5002)
- **Frontend:**
  - `REACT_APP_GOOGLE_CLIENT_ID`: Google OAuth Client ID
  - `REACT_APP_GOOGLE_MAPS_API_KEY`: Google Maps API key

## Usage
1. Register or log in (Google login supported).
2. Set your travel preferences and explore destinations.
3. Generate and save personalized tour plans.
4. View and manage your saved tours from the dashboard.

---

**Note:**
- Ensure both backend and frontend servers are running.
- Make sure to use valid Google API keys and MongoDB connection strings. 