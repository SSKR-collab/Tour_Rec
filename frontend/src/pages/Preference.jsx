import { useState, useEffect, useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from "../context/AuthContext";
import { getRecommendations } from "../api/planner";
import MapView from '../components/MapView';
import Itinerary from '../components/Itinerary';
import PreferenceForm from './PreferenceForm';
import LoadingOverlay from "../components/LoadingOverlay";
import ErrorModal from "../components/ErrorModal";
import { useNavigate } from 'react-router-dom';
import { optimizeTourRoute } from '../api/planner'; // Make sure this exists

const Preference = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentLocation, setCurrentLocation] = useState(null);
  const [optimizedRoute, setOptimizedRoute] = useState(null);
  const [places, setPlaces] = useState([]);
  const [preferences, setPreferences] = useState({
    time: 4,
    budget: 1000,
    pace: 'medium',
    interests: [],
    transport: 'driving'
  });
  const [error, setError] = useState(null);

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (err) => {
          console.error("Error getting location:", err);
          setCurrentLocation({
            lat: 28.6139, // Default to Delhi
            lng: 77.2090
          });
        }
      );
    }
  }, []);

  // Mutation for optimizing route
  const { mutate: optimizeRoute, isLoading } = useMutation({
    mutationFn: optimizeTourRoute,
    onSuccess: (data) => {
      setOptimizedRoute(data.route);
      setPlaces(data.places);
    },
    onError: (err) => {
      setError(err.response?.data?.message || 'Failed to optimize route');
    }
  });

  const handlePreferenceChange = (name, value) => {
    setPreferences(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleInterestToggle = (interest) => {
    setPreferences(prev => {
      const newInterests = prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest];
      return { ...prev, interests: newInterests };
    });
  };

  const handleSubmit = useCallback(() => {
    if (!currentLocation) {
      setError('Please enable location services');
      return;
    }

    optimizeRoute({
      userId: user?.id,
      location: currentLocation,
      preferences
    });
  }, [currentLocation, preferences, user, optimizeRoute]);

  const savePlan = () => {
    // Implement save logic
    console.log('Saving plan:', optimizedRoute);
    navigate('/dashboard/saved');
  };

  if (!user) {
    navigate('/login', { state: { from: '/planner' } });
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      {isLoading && <LoadingOverlay />}
      {error && (
        <ErrorModal 
          message={error}
          onClose={() => setError(null)}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <PreferenceForm 
              preferences={preferences}
              onChange={handlePreferenceChange}
              onInterestToggle={handleInterestToggle}
              onSubmit={handleSubmit}
              disabled={isLoading}
            />
          </div>
          
          <div className="lg:col-span-2 space-y-6">
            {optimizedRoute ? (
              <>
                <MapView 
                  route={optimizedRoute} 
                  places={places}
                  currentLocation={currentLocation}
                />
                <Itinerary 
                  route={optimizedRoute}
                  places={places}
                  onSave={savePlan}
                />
              </>
            ) : (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Your optimized tour will appear here
                </h2>
                <p className="text-gray-600">
                  Set your preferences and click "Generate Route" to create your perfect tour.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preference;