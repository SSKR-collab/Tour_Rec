# Tour Planning and Recommendation System

A full-stack web application for planning tours with personalized recommendations, route optimization, and interactive maps.

## 🚀 Quick Start Guide

### Prerequisites

Before running the application, make sure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** (comes with Node.js)
- **MongoDB** (or MongoDB Atlas account)
- **Google Maps API Key**

### 📋 Setup Instructions

#### 1. Clone and Navigate to Project
```bash
cd Tour_Rec
```

#### 2. Backend Setup

Navigate to the backend directory:
```bash
cd backend
```

Install dependencies:
```bash
npm install
```

Create environment file:
```bash
node createEnv.js
```

This will create a `.env` file with the following configuration:
```
GOOGLE_MAPS_API_KEY=AIzaSyDeL26THVRr605z_TbWT3vhqkj_97AUzTs
MONGODB_URI=mongodb+srv://lakhveers:sS52qVPeLF9hCcyT@cluster0.kihe7bi.mongodb.net/TOUR_DB?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your_jwt_secret_here
PORT=5002
```

**⚠️ Important**: You should replace the Google Maps API key with your own key for production use.

Start the backend server:
```bash
npm run dev
```

The backend will start on `http://localhost:5002`

#### 3. Frontend Setup

Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
```

Install dependencies:
```bash
npm install
```

Create environment file for frontend:
```bash
# Create .env.local file in frontend directory
echo "REACT_APP_GOOGLE_CLIENT_ID=your_google_oauth_client_id_here" > .env.local
```

Start the frontend development server:
```bash
npm start
```

The frontend will start on `http://localhost:3000`

### 🌐 Accessing the Application

1. **Frontend**: Open your browser and go to `http://localhost:3000`
2. **Backend API**: Available at `http://localhost:5002`

### 📱 Application Features

- **User Authentication**: Register/login with email or Google OAuth
- **Place Discovery**: Search and explore tourist destinations
- **Personalized Recommendations**: AI-powered place suggestions
- **Tour Planning**: Create optimized itineraries with route planning
- **Interactive Maps**: Visualize routes and destinations
- **Dashboard**: Track your tours and preferences

### 🔧 Available Scripts

#### Backend Scripts
```bash
npm run dev    # Start development server with nodemon
npm start      # Start production server
```

#### Frontend Scripts
```bash
npm start      # Start development server
npm build      # Build for production
npm test       # Run tests
```

### 🗄️ Database Setup

The application uses MongoDB. The connection string is already configured in the `.env` file. The database will be automatically created when you first run the application.

### 🔑 API Keys Setup

#### Google Maps API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the following APIs:
   - Maps JavaScript API
   - Places API
   - Directions API
   - Geocoding API
4. Create credentials (API Key)
5. Replace the API key in the backend `.env` file

#### Google OAuth Client ID (for frontend)
1. In Google Cloud Console, go to "Credentials"
2. Create OAuth 2.0 Client ID
3. Add `http://localhost:3000` to authorized origins
4. Add `http://localhost:3000/google-auth-success` to authorized redirect URIs
5. Add the client ID to frontend `.env.local` file

### 🐛 Troubleshooting

#### Common Issues

1. **Port already in use**
   ```bash
   # Kill process using port 5002 (backend)
   npx kill-port 5002
   
   # Kill process using port 3000 (frontend)
   npx kill-port 3000
   ```

2. **MongoDB connection error**
   - Check if the MongoDB URI is correct
   - Ensure MongoDB Atlas cluster is running
   - Check network connectivity

3. **Google Maps not loading**
   - Verify API key is correct
   - Check if required APIs are enabled
   - Ensure billing is set up in Google Cloud Console

4. **CORS errors**
   - Backend CORS is configured for `localhost:3000` and `localhost:3005`
   - If using different ports, update the CORS configuration in `backend/src/server.js`

#### Dependencies Issues
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### 📁 Project Structure

```
Tour_Rec/
├── backend/
│   ├── src/
│   │   ├── config/          # Database and passport configuration
│   │   ├── controllers/     # Request handlers
│   │   ├── middleware/      # Authentication middleware
│   │   ├── models/          # Database models
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic and external APIs
│   │   ├── utils/           # Helper functions and algorithms
│   │   └── server.js        # Main server file
│   ├── package.json
│   └── createEnv.js         # Environment setup script
├── frontend/
│   ├── src/
│   │   ├── api/             # API service functions
│   │   ├── components/      # Reusable React components
│   │   ├── context/         # React context providers
│   │   ├── pages/           # Page components
│   │   ├── services/        # Frontend services
│   │   └── utils/           # Utility functions
│   ├── package.json
│   └── tailwind.config.js   # Tailwind CSS configuration
└── README.md
```

### 🚀 Deployment

#### Backend Deployment
1. Set up environment variables on your hosting platform
2. Build and deploy the Node.js application
3. Configure CORS for your production domain

#### Frontend Deployment
1. Run `npm run build` to create production build
2. Deploy the `build` folder to your hosting platform
3. Update API endpoints to point to your production backend

### 📞 Support

If you encounter any issues:
1. Check the console for error messages
2. Verify all environment variables are set correctly
3. Ensure all dependencies are installed
4. Check if all required services are running

### 📄 License

This project is licensed under the ISC License.

---

**Happy Tour Planning! 🗺️✈️** 