import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMapMarkerAlt, FaClock, FaSearch, FaRoute, FaThumbsUp, 
  FaUsers, FaStar, FaHeart, FaShareAlt, FaCalendarAlt,
  FaUmbrellaBeach, FaShoppingBag, FaUtensils, FaMountain
} from 'react-icons/fa';
import { GiModernCity, GiTempleGate, GiIndianPalace, GiMonumentValley, GiIndiaGate } from 'react-icons/gi';
import { MdTerrain, MdDirectionsWalk, MdBeachAccess, MdMuseum, MdNature } from 'react-icons/md';
import { IoMdRestaurant, IoMdTrain } from 'react-icons/io';
import { BiShoppingBag } from 'react-icons/bi';
import { RiAncientGateFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const backgrounds = [
  'https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', // Himalayan trek
  'https://images.unsplash.com/photo-1566438480900-0609be27a4be?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', // Temple
  'https://images.unsplash.com/photo-1477587458883-47145ed94245?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', // Hill station
  'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', // Waterfall
  'https://images.unsplash.com/photo-1604503030536-8d5e3f5c5a1e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'  // Forest
];

const LandingPage = () => {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategory, setSearchCategory] = useState('all');

  // Rotate backgrounds every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % backgrounds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const heritageSites = {
    trekking: [
      {
        id: 1,
        name: 'Valley of Flowers',
        images: [
          'https://images.unsplash.com/photo-1587474260584-136574528ed5',
          'https://images.unsplash.com/photo-1566438480900-0609be27a4be'
        ],
        description: 'UNESCO World Heritage Site known for its meadows of endemic alpine flowers',
        state: 'Uttarakhand',
        type: 'Trekking'
      },
      {
        id: 2,
        name: 'Hampta Pass',
        images: [
          'https://images.unsplash.com/photo-1477587458883-47145ed94245',
          'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2'
        ],
        description: 'Breathtaking crossover trek from lush green valleys to barren landscapes',
        state: 'Himachal Pradesh',
        type: 'Trekking'
      }
    ],
    temples: [
      {
        id: 3,
        name: 'Kedarnath Temple',
        images: [
          'https://images.unsplash.com/photo-1604503030536-8d5e3f5c5a1e',
          'https://images.unsplash.com/photo-1564507592333-c60657eea523'
        ],
        description: 'Ancient Hindu temple dedicated to Lord Shiva, part of Char Dham pilgrimage',
        state: 'Uttarakhand',
        type: 'Temple'
      },
      {
        id: 4,
        name: 'Meenakshi Temple',
        images: [
          'https://images.unsplash.com/photo-1587474260584-136574528ed5',
          'https://images.unsplash.com/photo-1566438480900-0609be27a4be'
        ],
        description: 'Historic Hindu temple with stunning architecture and vibrant sculptures',
        state: 'Tamil Nadu',
        type: 'Temple'
      }
    ],
    hillstations: [
      {
        id: 5,
        name: 'Shimla',
        images: [
          'https://images.unsplash.com/photo-1477587458883-47145ed94245',
          'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2'
        ],
        description: 'Queen of hill stations with colonial architecture and scenic views',
        state: 'Himachal Pradesh',
        type: 'Hill Station'
      },
      {
        id: 6,
        name: 'Munnar',
        images: [
          'https://images.unsplash.com/photo-1604503030536-8d5e3f5c5a1e',
          'https://images.unsplash.com/photo-1564507592333-c60657eea523'
        ],
        description: 'Tea gardens, rolling hills and cool climate make this a perfect getaway',
        state: 'Kerala',
        type: 'Hill Station'
      }
    ],
    waterfalls: [
      {
        id: 7,
        name: 'Jog Falls',
        images: [
          'https://images.unsplash.com/photo-1587474260584-136574528ed5',
          'https://images.unsplash.com/photo-1566438480900-0609be27a4be'
        ],
        description: 'Second highest plunge waterfall in India, spectacular during monsoon',
        state: 'Karnataka',
        type: 'Waterfall'
      },
      {
        id: 8,
        name: 'Dudhsagar Falls',
        images: [
          'https://images.unsplash.com/photo-1477587458883-47145ed94245',
          'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2'
        ],
        description: 'Four-tiered waterfall resembling a sea of milk, surrounded by lush forests',
        state: 'Goa',
        type: 'Waterfall'
      }
    ]
  };

  const testimonials = [
    {
      id: 1,
      name: 'Arjun Mehta',
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
      text: 'The trekking recommendations were spot on! Found trails I never knew existed in my own state.',
      rating: 5,
    },
    {
      id: 2,
      name: 'Priya Desai',
      image: 'https://randomuser.me/api/portraits/women/2.jpg',
      text: 'Perfect temple itinerary for our spiritual journey. The timing suggestions helped us avoid crowds.',
      rating: 5,
    },
    {
      id: 3,
      name: 'Rohan Kapoor',
      image: 'https://randomuser.me/api/portraits/men/3.jpg',
      text: 'Discovered hidden hill stations that commercial tour operators never mention. Amazing experience!',
      rating: 5,
    },
  ];

  const [currentImageIndices, setCurrentImageIndices] = useState({});

  useEffect(() => {
    const initialIndices = {};
    Object.values(heritageSites).flat().forEach(site => {
      initialIndices[site.id] = 0;
    });
    setCurrentImageIndices(initialIndices);
  }, []);

  const cycleImage = (siteId) => {
    setCurrentImageIndices(prev => {
      const currentIndex = prev[siteId];
      const site = Object.values(heritageSites).flat().find(s => s.id === siteId);
      if (!site) return prev;

      const nextIndex = (currentIndex + 1) % site.images.length;
      return {...prev, [siteId]: nextIndex};
    });
  };

  const filteredSites = searchCategory === 'all' 
    ? Object.values(heritageSites).flat() 
    : heritageSites[searchCategory] || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <div className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="flex items-center">
              <div className="relative">
                <div className="absolute inset-0 bg-green-100 rounded-full blur-sm"></div>
                <img 
                  src="/logo192.png"
                  alt="ExploreIndia Logo"
                  className="h-12 w-12 relative z-10 rounded-full p-1 bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
                />
              </div>
              <span className="text-2xl font-bold text-green-600 ml-3">Tour Rec</span>
            </Link>

            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-gray-700 hover:text-green-600 font-medium transition-colors">
                Login
              </Link>
              <Link 
                to="/register" 
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section with Rotating Backgrounds */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden pt-16">
        <AnimatePresence mode='wait'>
          <motion.div
            key={currentBgIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-0"
          >
            <img
              src={backgrounds[currentBgIndex]}
              alt="Travel Background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          </motion.div>
        </AnimatePresence>
        
        <div className="relative z-10 text-center text-white px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            Discover India's Natural Wonders
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl mb-8"
          >
            From Himalayan treks to ancient temples and serene hill stations
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link
              to="/explore"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300"
            >
              Start Exploring
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Search Bar */}
      <div className="container mx-auto px-4 -mt-12 relative z-20">
        <div className="bg-white rounded-xl shadow-2xl p-6 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-4 top-4 text-gray-400" />
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search treks, temples, hill stations..."
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <select 
              value={searchCategory}
              onChange={(e) => setSearchCategory(e.target.value)}
              className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="all">All Categories</option>
              <option value="trekking">Trekking</option>
              <option value="temples">Temples</option>
              <option value="hillstations">Hill Stations</option>
              <option value="waterfalls">Waterfalls</option>
            </select>
            <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Featured Destinations Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Featured Destinations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                id: 1,
                name: 'Akshardham Temple',
                city: 'Delhi',
                type: 'Temple',
                image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                description: 'A magnificent Hindu temple complex showcasing traditional Indian architecture and culture',
                rating: 4.9
              },
              {
                id: 2,
                name: 'Kedarnath Temple',
                city: 'Uttarakhand',
                type: 'Temple',
                image: 'https://images.unsplash.com/photo-1566438480900-0609be27a4be?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                description: 'Ancient Hindu temple dedicated to Lord Shiva, part of Char Dham pilgrimage',
                rating: 4.8
              },
              {
                id: 3,
                name: 'Taj Hotel',
                city: 'Mumbai',
                type: 'Hotel',
                image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                description: 'Luxury hotel known for its iconic architecture and world-class hospitality',
                rating: 4.9
              },
              {
                id: 4,
                name: 'South Indian Lakes',
                city: 'Kerala',
                type: 'Nature',
                image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                description: 'Serene backwaters and lakes offering unique houseboat experiences',
                rating: 4.7
              },
              {
                id: 5,
                name: 'Rohtas Fort',
                city: 'Bihar',
                type: 'Historical',
                image: 'https://images.unsplash.com/photo-1604503030536-8d5e3f5c5a1e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                description: 'UNESCO World Heritage Site showcasing magnificent Mughal architecture',
                rating: 4.6
              },
              {
                id: 6,
                name: 'Golden Temple',
                city: 'Amritsar',
                type: 'Temple',
                image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                description: 'Most sacred shrine of Sikhism, known for its stunning golden architecture',
                rating: 4.9
              }
            ].map((site) => (
              <motion.div
                key={site.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100"
              >
                <div className="relative h-64 w-full">
                  <img
                    src={site.image}
                    alt={site.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
                  <div className="absolute bottom-0 left-0 p-4 text-white">
                    <h3 className="text-xl font-bold">{site.name}</h3>
                    <p className="text-sm">{site.city}</p>
                  </div>
                  <span className={`absolute bottom-4 right-4 text-white text-xs px-3 py-1 rounded-full ${
                    site.type === 'Temple' ? 'bg-amber-600' :
                    site.type === 'Hotel' ? 'bg-blue-600' :
                    site.type === 'Nature' ? 'bg-green-600' :
                    'bg-purple-600'
                  }`}>
                    {site.type}
                  </span>
                </div>
                <div className="p-4">
                  <p className="text-gray-700 text-sm mb-4">
                    {site.description}
                  </p>
                  <div className="flex items-center justify-between text-gray-600 text-sm">
                    <div className="flex items-center space-x-1">
                      <FaStar className="text-yellow-400" />
                      <span>{site.rating} (124)</span>
                    </div>
                    <Link 
                      to={`/destinations/${site.id}`} 
                      className="text-green-600 hover:underline flex items-center"
                    >
                      View Details <span className="ml-1">&rarr;</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Developers Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Developed By
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6 flex items-center space-x-6">
              <img
                src="/Shiv.jpg"
                alt="Shiv Shakti Kumar"
                className="w-32 h-32 rounded-full object-cover border-4 border-green-100"
              />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Shiv Shakti Kumar</h3>
                <p className="text-gray-600 mb-1">23114091</p>
                <p className="text-gray-600">IIT Roorkee Computer Science Student</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 flex items-center space-x-6">
              <img
                src="/Lakhveer.jpeg"
                alt="Lakhveer Singh"
                className="w-32 h-32 rounded-full object-cover border-4 border-green-100"
              />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Lakhveer Singh</h3>
                <p className="text-gray-600 mb-1">23114053</p>
                <p className="text-gray-600">IIT Roorkee Computer Science Student</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-green-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready for Your Next Adventure?</h2>
          <p className="text-xl mb-8">
            Get personalized trekking guides and spiritual journey plans.
          </p>
          <Link
            to="/register"
            className="bg-white text-green-700 font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-200 transition duration-300"
          >
            Join Tour Rec Today
          </Link>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <FaMapMarkerAlt className="text-5xl text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">1. Choose Your Interest</h3>
              <p className="text-gray-700">
                Select from trekking, temples, hill stations or waterfalls based on your preferences.
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <FaRoute className="text-5xl text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">2. Get Customized Plans</h3>
              <p className="text-gray-700">
                Receive detailed itineraries with difficulty levels, best seasons and local tips.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            What Our Adventurers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map(testimonial => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: testimonial.id * 0.1 }}
                className="bg-gray-50 p-6 rounded-lg shadow-md flex flex-col items-center text-center"
              >
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-20 h-20 rounded-full mb-4 object-cover border-4 border-white shadow-lg"
                />
                <p className="text-lg font-semibold text-gray-900 mb-2">{testimonial.name}</p>
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 italic">"{testimonial.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Link to="/" className="flex items-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-green-100 rounded-full blur-sm"></div>
                  <img 
                    src="/logo192.png"
                    alt="Tour Rec Logo"
                    className="h-12 w-12 relative z-10 rounded-full p-1 bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
                  />
                </div>
                <span className="text-2xl font-bold text-green-400 ml-3">Tour Rec</span>
              </Link>
              <p className="mt-2 text-gray-400">Discover India's natural and spiritual wonders</p>
            </div>
            <div className="flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0">
              <div>
                <h3 className="font-bold text-lg mb-2">Explore</h3>
                <ul className="space-y-1">
                  <li><Link to="/trekking" className="text-gray-400 hover:text-white">Trekking</Link></li>
                  <li><Link to="/temples" className="text-gray-400 hover:text-white">Temples</Link></li>
                  <li><Link to="/hill-stations" className="text-gray-400 hover:text-white">Hill Stations</Link></li>
                  <li><Link to="/waterfalls" className="text-gray-400 hover:text-white">Waterfalls</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Company</h3>
                <ul className="space-y-1">
                  <li><Link to="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
                  <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
                  <li><Link to="/blog" className="text-gray-400 hover:text-white">Blog</Link></li>
                  <li><Link to="/careers" className="text-gray-400 hover:text-white">Careers</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Legal</h3>
                <ul className="space-y-1">
                  <li><Link to="/privacy" className="text-gray-400 hover:text-white">Privacy</Link></li>
                  <li><Link to="/terms" className="text-gray-400 hover:text-white">Terms</Link></li>
                  <li><Link to="/cookies" className="text-gray-400 hover:text-white">Cookies</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Tour Rec. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;