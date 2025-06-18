import React, { useState, useEffect } from 'react';
import { FiCalendar, FiMapPin, FiClock, FiStar, FiHeart } from 'react-icons/fi';

const Tours = () => {
  const [upcomingTours, setUpcomingTours] = useState([]);
  const [completedTours, setCompletedTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock data that would typically come from a backend API
  const allMockTours = [
    {
      id: 1,
      title: "Paris City Tour",
      description: "Experience the romance of Paris with visits to iconic landmarks",
      duration: "3 days, 2 nights",
      highlights: ["Eiffel Tower", "Louvre Museum", "Seine River Cruise"],
      status: "upcoming",
      date: "Jun 15-17, 2023",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1431274172761-fca41d930114?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      id: 2,
      title: "Swiss Alps Adventure",
      description: "Breathtaking mountain views and outdoor activities",
      duration: "5 days, 4 nights",
      highlights: ["Jungfraujoch", "Interlaken", "Grindelwald"],
      status: "completed",
      date: "May 10-14, 2023",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      id: 3,
      title: "Italian Getaway",
      description: "Discover the art, history, and cuisine of Italy",
      duration: "7 days, 6 nights",
      highlights: ["Colosseum", "Venice Canals", "Florence Duomo"],
      status: "upcoming",
      date: "Jul 22-28, 2023",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1533676802871-eca1ae998cd5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      id: 4,
      title: "Greek Island Hopping",
      description: "Explore the beautiful islands of the Aegean Sea",
      duration: "6 days, 5 nights",
      highlights: ["Santorini", "Mykonos", "Delos"],
      status: "draft",
      date: "Aug 5-10, 2023",
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      id: 5,
      title: "Japanese Cultural Journey",
      description: "Immerse yourself in ancient traditions and modern wonders.",
      duration: "8 days, 7 nights",
      highlights: ["Tokyo", "Kyoto", "Mount Fuji"],
      status: "completed",
      date: "Apr 1-8, 2023",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1542051841-320573903102?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    }
  ];

  useEffect(() => {
    const fetchTours = async () => {
      setLoading(true);
      setError(null);
      try {
        // Simulate API call with a delay
        await new Promise(resolve => setTimeout(resolve, 1000)); 
        
        // Filter mock data based on status
        const upcoming = allMockTours.filter(tour => tour.status === 'upcoming' || tour.status === 'draft');
        const completed = allMockTours.filter(tour => tour.status === 'completed');

        setUpcomingTours(upcoming);
        setCompletedTours(completed);
      } catch (err) {
        setError("Failed to fetch tours. Please try again later.");
        console.error("Error fetching tours:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  const getStatusColor = (status) => {
    switch(status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderTourCard = (tour) => (
    <div 
      key={tour.id} 
      className="bg-white bg-opacity-90 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden hover:scale-[1.02] transition-transform duration-300"
    >
      {/* Tour Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={tour.image} 
          alt={tour.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute top-4 right-4">
          <button className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
            <FiHeart className="text-red-500" />
          </button>
        </div>
      </div>

      {/* Tour Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-xl font-bold text-gray-900">{tour.title}</h2>
          <div className="flex items-center">
            <FiStar className="text-yellow-400 mr-1" />
            <span className="text-sm font-medium">{tour.rating}</span>
          </div>
        </div>

        <p className="text-gray-600 mb-4">{tour.description}</p>

        <div className="flex items-center text-gray-500 text-sm mb-3">
          <FiCalendar className="mr-2" />
          <span>{tour.date}</span>
        </div>

        <div className="flex items-center text-gray-500 text-sm mb-4">
          <FiClock className="mr-2" />
          <span>{tour.duration}</span>
        </div>

        <div className="mb-4">
          <span className={`inline-block ${getStatusColor(tour.status)} px-3 py-1 rounded-full text-xs font-semibold`}>
            {tour.status.charAt(0).toUpperCase() + tour.status.slice(1)}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <button className="text-indigo-600 font-medium hover:text-indigo-800 flex items-center">
            <FiMapPin className="mr-1" /> Highlights
          </button>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors duration-300">
            View Details
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen">
      {/* Stunning Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 opacity-95"></div>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center mix-blend-overlay"></div>
      
      {/* Content */}
      <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Your Tours</h1>
          <p className="text-xl text-indigo-200 max-w-3xl mx-auto">
            View your booked tours, saved trips, and personalized recommendations
          </p>
        </div>

        {loading && <div className="text-center text-white text-xl">Loading tours...</div>}
        {error && <div className="text-center text-red-400 text-xl">{error}</div>}

        {!loading && !error && (
          <>
            {/* Upcoming & Saved Tours Section */}
            <h2 className="text-3xl font-bold text-white mb-6">Your Upcoming & Saved Tours</h2>
            {upcomingTours.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {upcomingTours.map(renderTourCard)}
              </div>
            ) : (
              <div className="text-center py-6 bg-white/80 rounded-xl shadow-lg mb-12">
                <h3 className="text-xl font-medium text-gray-700 mb-2">No upcoming or saved tours</h3>
                <p className="text-gray-500 mb-4">Start exploring amazing destinations to plan your next adventure</p>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg text-lg font-medium">
                  Browse Tours
                </button>
              </div>
            )}

            {/* Trips You've Covered Section */}
            <h2 className="text-3xl font-bold text-white mb-6 mt-12">Trips You've Covered</h2>
            {completedTours.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {completedTours.map(renderTourCard)}
              </div>
            ) : (
              <div className="text-center py-6 bg-white/80 rounded-xl shadow-lg">
                <h3 className="text-xl font-medium text-gray-700 mb-2">No completed trips yet</h3>
                <p className="text-gray-500 mb-4">Book and complete tours to see them here!</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Tours;