# Software Requirements Specification (SRS)
## Tour Recommendation System Web Application

**Version:** 1.0  
**Date:** June 2024  
**Project:** Tour Recommendation System  
**Team:** Tour_Rec Development Team

---

## Table of Contents
1. Introduction
2. System Overview
3. Functional Requirements
4. Non-Functional Requirements
5. System Architecture
6. User Interface Requirements
7. Data Requirements
8. External Interfaces
9. Performance Requirements
10. Security Requirements
11. Constraints and Limitations
12. Glossary

---

## 1. Introduction

### 1.1 Purpose
This document specifies the requirements for the Tour Recommendation System web application, which helps users discover, plan, and manage personalized tours based on their preferences.

### 1.2 Scope
The system is a web application that allows users to:
- Register and log in (email/password or Google OAuth)
- Set and update travel preferences
- Search and filter places using Google Places API
- Get personalized recommendations
- Plan and optimize tour routes
- Save, view, update, and delete tour plans
- View interactive maps and basic dashboard stats

### 1.3 Definitions and Acronyms
- **SRS**: Software Requirements Specification
- **API**: Application Programming Interface
- **JWT**: JSON Web Token
- **TSP**: Traveling Salesman Problem
- **OAuth**: Open Authorization (Google login)
- **MERN**: MongoDB, Express.js, React.js, Node.js

### 1.4 References
- Google Maps Platform documentation
- MongoDB documentation
- React.js documentation
- Express.js documentation

---

## 2. System Overview

### 2.1 System Purpose
The system streamlines travel planning by providing personalized recommendations and optimized itineraries, focusing on Indian tourist destinations but adaptable to any location.

### 2.2 System Context
- **Frontend**: React.js web application
- **Backend**: Node.js/Express.js server
- **Database**: MongoDB (Mongoose ODM)
- **External Services**: Google Maps, Places, and Directions APIs

### 2.3 System Functions
1. User registration and login (email/password, Google OAuth)
2. User profile and preferences management
3. Place search, filtering, and details
4. Personalized recommendations (collaborative filtering, content-based, fallback)
5. Tour planning and route optimization (Google Directions API, TSP fallback)
6. Save, view, update, and delete tour plans
7. Interactive maps and dashboard with basic stats

---

## 3. Functional Requirements

### 3.1 User Management
- Users can register with email and password
- Users can log in with email/password or Google account
- Users can update their profile and preferences
- Users stay logged in using JWT tokens
- Users can log out securely

### 3.2 Place Discovery and Search
- Users can search for places by name
- Users can filter places by type (museum, park, temple, etc.)
- The app shows place details (name, type, rating, address, photo)

### 3.3 Recommendation System
- The system suggests places based on user preferences and visit history
- Collaborative filtering and content-based algorithms are used
- If insufficient data, fallback to popular places
- Users can filter recommendations by city

### 3.4 Tour Planning
- Users can create travel plans with multiple destinations
- Users must select at least 2 places for a plan
- The system validates all selected places have valid locations
- Users can choose automatic (optimized) or manual route ordering
- Route optimization uses Google Directions API; fallback to TSP/greedy algorithm if needed
- The system calculates travel times and total trip duration
- Users can save, view, update, and delete their plans

### 3.5 Map and Location Services
- Interactive maps are shown using Google Maps
- Markers are displayed for all selected places
- The optimized route is shown on the map
- Users can zoom and pan the map
- The app can find places near the user's current location (with permission)

### 3.6 Dashboard
- Users see a dashboard with basic stats (saved tours, upcoming tours, completed tours)
- Users can view recent activities and recommended tours

---

## 4. Non-Functional Requirements
- The app should respond within 3 seconds
- Multiple users should be able to use the app simultaneously
- The app should handle up to 1000 users concurrently
- Database queries should be efficient
- The interface should be user-friendly and responsive
- Error messages should be clear and helpful

---

## 5. System Architecture
- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT, Google OAuth
- **Maps**: Google Maps API
- **External APIs**: Google Places, Directions
- **Key Components**: Controllers, Services, Models, Routes, Middleware, Utils

---

## 6. User Interface Requirements
- The interface is responsive and works on desktop and mobile
- Modern design with clear navigation
- Key screens: Landing page, Login/Register, Dashboard, Place Search, Tour Planning, Profile/Preferences
- Interactive maps with markers and routes
- Loading indicators and error messages

---

## 7. Data Requirements

### 7.1 Data Models
- **User**: name, email, passwordHash, preferences, visitedPlaceIds
- **Place**: placeId, name, types, rating, address, location, photoUrl, cost, duration
- **Plan**: user, sourceLocation, selectedPlaces, totalTime, isSorted, summary, savedLocation

### 7.2 Data Validation
- All user inputs are validated on frontend and backend
- Email addresses must be valid
- Location coordinates must be valid
- Required fields are enforced at the database level

### 7.3 Data Persistence
- User data and plans are stored in MongoDB
- Place data is cached and updated as needed
- User preferences are stored for recommendations

---

## 8. External Interfaces
- **Google Maps JavaScript API**: for displaying maps
- **Google Places API**: for place information
- **Google Directions API**: for route optimization
- **Google OAuth 2.0**: for social login
- **JWT**: for session management
- **bcrypt**: for password hashing
- **RESTful API**: for backend services
- **CORS**: for cross-origin requests

---

## 9. Performance Requirements
- Pages should load within 3 seconds
- API responses should return within 1 second
- Maps should render within 2 seconds
- The system should handle 100 requests per second
- Database queries should be optimized

---

## 10. Security Requirements
- User authentication is required for sensitive operations
- JWT tokens are used for authentication and expire after a set time
- Passwords are hashed using bcrypt
- All user inputs are validated and sanitized
- CORS policies are implemented
- API keys are stored securely in environment variables

---

## 11. Constraints and Limitations
- The system requires valid Google Maps API keys
- Subject to Google API rate limits
- Requires internet connection for external services
- Works best on modern web browsers
- Place data depends on Google Places API
- Route optimization depends on Google Directions API
- Recommendations require sufficient user data

---

## 12. Glossary
- **Tour Plan**: A collection of destinations with optimized route and timing
- **Place**: A tourist destination or attraction
- **Collaborative Filtering**: Recommendation based on user behavior patterns
- **Route Optimization**: Finding the most efficient path between destinations
- **JWT**: JSON Web Token for authentication
- **API**: Application Programming Interface
- **ODM**: Object Document Mapper (Mongoose)
- **CORS**: Cross-Origin Resource Sharing
- **OAuth**: Open Authorization protocol for Google login

---

*This SRS document provides a comprehensive and accurate overview of the Tour Recommendation System web application as implemented. It serves as a guide for building, testing, and maintaining the application.* 