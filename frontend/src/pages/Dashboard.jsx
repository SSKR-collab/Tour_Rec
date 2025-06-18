import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaHistory, 
  FaHeart, 
  FaMapMarkedAlt, 
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaStar,
  FaRegStar,
  FaSearch,
  FaFilter,
  FaEllipsisH
} from 'react-icons/fa';
import { FiActivity } from 'react-icons/fi';
import { RiDashboardFill } from 'react-icons/ri';
import axios from 'axios'; // Import axios for API calls
import LoadingSpinner from "../components/LoadingSpinner"; // Assuming you have this component
import ErrorMessage from "../components/ErrorMessage"; // Assuming you have this component
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({
    savedTours: 0,
    completedTours: 0,
    wishlistItems: 0,
    upcomingTours: 0
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [recommendedTours, setRecommendedTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      if (!user) { // Only fetch if user is logged in
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null); 
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      if (!token) {
        setError("Authentication token not found.");
        setLoading(false);
        return;
      }

      try {
        // Fetch User Plans (for stats and recent activities)
        const plansResponse = await axios.get('/api/plan', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const plans = plansResponse.data;
        
        let completedCount = 0;
        let upcomingCount = 0;
        let savedCount = 0; 

        const activities = plans.map(plan => {
          // This mapping is simplified. You might need to adjust based on your `Plan` model's fields
          // to correctly determine `status` and `rating` for recent activities.
          const firstPlace = plan.selectedPlaces[0]?.place; 
          return {
            id: plan._id,
            title: firstPlace?.name || 'Unnamed Plan',
            date: new Date(plan.createdAt).toLocaleDateString(), 
            status: 'upcoming', 
            location: firstPlace?.city || 'N/A',
            rating: null 
          };
        });

        // Simplified stats based on plans:
        setStats({
          savedTours: activities.length,
          completedTours: 0, 
          wishlistItems: 0, 
          upcomingTours: activities.length, 
        });
        setRecentActivities(activities.slice(0, 3)); 

        // Fetch Recommended Tours (Places)
        const recommenderResponse = await axios.get('/api/recommender/hybrid', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Transform backend place object to frontend tour structure
        const transformedRecommendations = recommenderResponse.data.recommended.map(place => ({
          id: place.placeId,
          title: place.name,
          location: place.address || place.city || 'N/A',
          price: Math.floor(Math.random() * (20000 - 5000 + 1)) + 5000, 
          duration: `${Math.floor(Math.random() * 5) + 1} days`, 
          rating: place.rating || 4.0, 
          image: place.photoUrl || 'https://via.placeholder.com/300x200?text=No+Image', 
          saved: false 
        }));
        setRecommendedTours(transformedRecommendations);

      } catch (err) {
        console.error("Dashboard data fetch error:", err);
        setError(err.response?.data?.message || "Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]); 

  const filteredTours = recommendedTours.filter(tour =>
    tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tour.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleSaveTour = (tourId) => {
    setRecommendedTours(tours =>
      tours.map(tour =>
        tour.id === tourId ? { ...tour, saved: !tour.saved } : tour
      )
    );
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStar key={i} className="text-yellow-400 opacity-70" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />);
      }
    }

    return stars;
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Dashboard Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, <span className="text-blue-600">{user?.name}</span>!
            </h1>
            <p className="text-gray-600 mt-2">
              Here's what's happening with your travel plans
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search tours..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
              <FaFilter className="mr-2 text-gray-600" />
              <span>Filters</span>
            </button>
            <Link
              to="/plan-tour"
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors"
            >
              <FaMapMarkedAlt className="mr-2" />
              Create New Plan
            </Link>
          </div>
        </motion.div>

        {loading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}

        {!loading && !error && (
          <>
            {/* Navigation Tabs */}
            <div className="mb-8 border-b border-gray-200">
              <nav className="flex space-x-8">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${activeTab === 'dashboard' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                >
                  <RiDashboardFill className="mr-2" />
                  Dashboard
                </button>
                <button
                  onClick={() => setActiveTab('saved')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${activeTab === 'saved' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                >
                  <FaHeart className="mr-2" />
                  Saved Tours
                </button>
                <button
                  onClick={() => setActiveTab('history')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${activeTab === 'history' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                >
                  <FaHistory className="mr-2" />
                  Trip History
                </button>
              </nav>
            </div>

            {/* Dashboard Content */}
            <AnimatePresence mode="wait">
              {activeTab === 'dashboard' && (
                <motion.div
                  key="dashboard-content"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {/* Stats Cards */}
                  <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between">
                    <div>
                      <h3 className="text-gray-500 text-sm font-medium">Saved Tours</h3>
                      <p className="text-3xl font-bold text-gray-900 mt-1">{stats.savedTours}</p>
                    </div>
                    <FaHeart className="text-blue-500 text-4xl opacity-70" />
                  </div>
                  <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between">
                    <div>
                      <h3 className="text-gray-500 text-sm font-medium">Completed Tours</h3>
                      <p className="text-3xl font-bold text-gray-900 mt-1">{stats.completedTours}</p>
                    </div>
                    <FaCheckCircle className="text-green-500 text-4xl opacity-70" />
                  </div>
                  <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between">
                    <div>
                      <h3 className="text-gray-500 text-sm font-medium">Upcoming Tours</h3>
                      <p className="text-3xl font-bold text-gray-900 mt-1">{stats.upcomingTours}</p>
                    </div>
                    <FaCalendarAlt className="text-orange-500 text-4xl opacity-70" />
                  </div>

                  {/* Recent Activities */}
                  <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      <FiActivity className="mr-2 text-blue-600" /> Recent Activities
                    </h2>
                    {recentActivities.length > 0 ? (
                      <ul className="space-y-4">
                        {recentActivities.map(activity => (
                          <li key={activity.id} className="flex items-center justify-between border-b pb-3 last:pb-0 last:border-b-0">
                            <div>
                              <p className="font-medium text-gray-900">{activity.title}</p>
                              <p className="text-sm text-gray-500 flex items-center mt-1">
                                <FaMapMarkedAlt className="mr-1" /> {activity.location}
                              </p>
                              <p className="text-xs text-gray-400 mt-1">
                                {activity.date}
                              </p>
                            </div>
                            <div className="flex items-center space-x-2">
                              {activity.rating && (
                                <div className="flex items-center text-yellow-500">
                                  {renderStars(activity.rating)}
                                </div>
                              )}
                              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                activity.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                              }`}>
                                {activity.status}
                              </span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500 text-center py-4">No recent activities yet.</p>
                    )}
                  </div>

                  {/* Recommended Tours (Places) */}
                  <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-3">
                    <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      <FaMapMarkedAlt className="mr-2 text-blue-600" /> Recommended for You
                    </h2>
                    {filteredTours.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredTours.map((tour) => (
                          <div key={tour.id} className="relative bg-gray-50 rounded-lg shadow-sm overflow-hidden group">
                            <img 
                              src={tour.image} 
                              alt={tour.title} 
                              className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" 
                              onError={(e) => { e.target.src = 'https://via.placeholder.com/300x200?text=No+Image'; }}
                            />
                            <div className="p-4">
                              <h3 className="font-semibold text-gray-900 text-lg mb-1">{tour.title}</h3>
                              <p className="text-sm text-gray-600 flex items-center"><FaMapMarkedAlt className="mr-1" /> {tour.location}</p>
                              <div className="flex items-center text-gray-500 text-sm mt-2">
                                <FaClock className="mr-1" /> {tour.duration}
                              </div>
                              <div className="flex items-center text-yellow-500 text-sm mt-1">
                                {renderStars(tour.rating)}
                                <span className="ml-1 text-gray-600 text-xs">({tour.rating})</span>
                              </div>
                              <div className="mt-3 flex justify-between items-center">
                                <span className="text-blue-600 font-bold text-lg">₹{tour.price}</span>
                                <button
                                  onClick={() => toggleSaveTour(tour.id)}
                                  className={`p-2 rounded-full transition-colors ${tour.saved ? 'bg-red-100 text-red-500' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
                                >
                                  <FaHeart />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-4">No recommendations available.</p>
                    )}
                  </div>
                </motion.div>
              )}

              {activeTab === 'saved' && (
                <motion.div
                  key="saved-content"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-lg shadow-md p-6"
                >
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Your Saved Tours</h2>
                  <p className="text-gray-600">Content for saved tours will go here. (From plans backend)</p>
                </motion.div>
              )}

              {activeTab === 'history' && (
                <motion.div
                  key="history-content"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-lg shadow-md p-6"
                >
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Trip History</h2>
                  <p className="text-gray-600">Content for trip history will go here. (From plans backend)</p>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;