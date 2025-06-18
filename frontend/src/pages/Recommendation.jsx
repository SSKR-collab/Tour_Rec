import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSortAmountDownAlt, FaMapMarkerAlt, FaClock, FaInfoCircle, FaTimesCircle, FaRoute } from 'react-icons/fa';
import { FiLoader } from 'react-icons/fi';

const Recommendation = () => {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [sortedPlaces, setSortedPlaces] = useState([]);
  const [isSorted, setIsSorted] = useState(false);
  const [loadingSort, setLoadingSort] = useState(false);
  const [loadingPlaces, setLoadingPlaces] = useState(true);
  const [places, setPlaces] = useState([]);
  const [tripPlanned, setTripPlanned] = useState(false);
  const [error, setError] = useState(null);

  // Background images
  const banners = [
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1476514525535-07d3dc8fabda?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1501785888041-af3ba6f60060?q=80&w=2070&auto=format&fit=crop',
  ];

  // Fetch places from your backend API
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        setLoadingPlaces(true);
        setError(null);
        
        const response = await fetch('/api/places'); // Your backend endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch places');
        }
        
        const data = await response.json();
        setPlaces(data);
      } catch (err) {
        console.error('Error fetching places:', err);
        setError(err.message);
      } finally {
        setLoadingPlaces(false);
      }
    };

    fetchPlaces();
  }, []);

  // Auto-cycle banners
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);

  const togglePlaceSelection = (place) => {
    setSelectedPlaces((prev) => 
      prev.some(p => p.id === place.id)
        ? prev.filter(p => p.id !== place.id)
        : [...prev, place]
    );
    // Reset any existing plan when selection changes
    setIsSorted(false);
    setSortedPlaces([]);
    setTripPlanned(false);
  };

  const planTrip = async (shouldSort = false) => {
    if (selectedPlaces.length < 2) return;

    setLoadingSort(true);
    setError(null);

    try {
      console.log('Sending request to plan trip:', {
        places: selectedPlaces,
        optimize: shouldSort
      });

      const response = await fetch('/api/places/plan-trip', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          places: selectedPlaces,
          optimize: shouldSort
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to plan trip');
      }

      const result = await response.json();
      console.log('Received response:', result);
      
      setSortedPlaces(result.optimizedRoute);
      setIsSorted(shouldSort);
      setTripPlanned(true);
    } catch (err) {
      console.error('Error planning trip:', err);
      setError(err.message);
    } finally {
      setLoadingSort(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800 pt-20">
      {/* Banner Section */}
      <section className="relative h-64 md:h-96 w-full overflow-hidden shadow-lg">
        <AnimatePresence initial={false}>
          <motion.img
            key={currentBannerIndex}
            src={banners[currentBannerIndex]}
            alt="Travel banner"
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white text-center drop-shadow-lg">
            Your Personalized Journey Awaits
          </h1>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-8" role="alert">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}

        {/* Places Selection Section */}
        <section className="bg-white rounded-lg shadow-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Select Places for Your Recommendation
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Choose a few destinations you are interested in.
          </p>

          {loadingPlaces ? (
            <div className="flex justify-center items-center py-12">
              <FiLoader className="animate-spin text-4xl text-blue-600" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {places.map((place) => (
                  <motion.div
                    key={place.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className={`relative bg-gray-50 border rounded-lg overflow-hidden shadow-sm cursor-pointer
                      ${selectedPlaces.some(p => p.id === place.id) 
                        ? 'border-blue-600 ring-2 ring-blue-500' 
                        : 'border-gray-200 hover:border-blue-300'}
                    `}
                    onClick={() => togglePlaceSelection(place)}
                  >
                    <img 
                      src={place.image} 
                      alt={place.name} 
                      className="w-full h-32 object-cover" 
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x200?text=Place+Image';
                      }}
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900">{place.name}</h3>
                      <p className="text-sm text-gray-600 flex items-center">
                        <FaMapMarkerAlt className="mr-1" /> {place.city}
                      </p>
                      <p className="text-sm text-gray-600 flex items-center mt-1">
                        <FaClock className="mr-1" /> {place.estimatedTime || 'Not specified'}
                      </p>
                      {selectedPlaces.some(p => p.id === place.id) && (
                        <div className="absolute top-2 right-2 text-blue-600">
                          <FaTimesCircle className="text-xl" />
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                <button
                  onClick={() => planTrip(false)}
                  disabled={selectedPlaces.length < 2 || loadingSort}
                  className={`px-6 py-3 rounded-full text-lg font-bold transition-all duration-300 flex items-center justify-center
                    ${selectedPlaces.length < 2 
                      ? 'bg-gray-300 text-gray-600 cursor-not-allowed' 
                      : 'bg-green-600 hover:bg-green-700 text-white shadow-lg'}
                  `}
                >
                  <FaRoute className="mr-3" /> Plan Trip
                </button>

                <button
                  onClick={() => planTrip(true)}
                  disabled={selectedPlaces.length < 2 || loadingSort}
                  className={`px-6 py-3 rounded-full text-lg font-bold transition-all duration-300 flex items-center justify-center
                    ${selectedPlaces.length < 2 
                      ? 'bg-gray-300 text-gray-600 cursor-not-allowed' 
                      : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg'}
                  `}
                >
                  {loadingSort ? (
                    <>
                      <FiLoader className="animate-spin mr-3" /> Optimizing...
                    </>
                  ) : (
                    <>
                      <FaSortAmountDownAlt className="mr-3" /> Optimize Route
                    </>
                  )}
                </button>
              </div>

              {selectedPlaces.length < 2 && (
                <p className="text-sm text-gray-500 mt-2 text-center">
                  Select at least 2 places to plan your trip.
                </p>
              )}
            </>
          )}
        </section>

        {/* Trip Plan Section */}
        {tripPlanned && (
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-xl p-8"
          >
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              {isSorted ? 'Optimized Travel Itinerary' : 'Your Travel Plan'}
            </h2>

            {isSorted && (
              <div className="bg-blue-50 border-l-4 border-blue-400 text-blue-700 p-4 mb-8" role="alert">
                <div className="flex items-center">
                  <FaInfoCircle className="mr-3 text-2xl" />
                  <div>
                    <p className="font-bold">Optimized Route</p>
                    <p className="text-sm">
                      The order has been optimized to minimize travel time between locations.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-6">
              {sortedPlaces.map((place, index) => (
                <motion.div
                  key={place.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="flex items-center bg-gray-50 p-4 rounded-lg shadow-sm"
                >
                  <span className="flex-shrink-0 text-blue-600 font-extrabold text-2xl mr-4 w-8 h-8 flex items-center justify-center bg-blue-100 rounded-full">
                    {index + 1}
                  </span>
                  <img 
                    src={place.image} 
                    alt={place.name} 
                    className="w-16 h-16 object-cover rounded-lg mr-4"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x200?text=Place+Image';
                    }}
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{place.name}</h3>
                    <p className="text-gray-700 text-sm flex items-center">
                      <FaMapMarkerAlt className="mr-1" /> {place.city}
                    </p>
                    <p className="text-gray-600 text-xs flex items-center">
                      <FaClock className="mr-1" /> Estimated Visit: {place.estimatedTime || 'Not specified'}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Total estimated time could be added here if your API provides it */}
            {isSorted && (
              <div className="mt-8 p-4 bg-green-50 rounded-lg border border-green-200">
                <h3 className="text-lg font-semibold text-green-800">Trip Summary</h3>
                <p className="text-green-700">
                  Estimated total travel time: {/* Add the time from your API response */}
                </p>
              </div>
            )}
          </motion.section>
        )}
      </div>
    </div>
  );
};

export default Recommendation;