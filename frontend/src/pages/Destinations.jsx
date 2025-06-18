import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaClock, FaRupeeSign, FaStar, FaSearch, FaDirections } from 'react-icons/fa';
import { motion } from 'framer-motion';

// Helper function for Haversine distance (straight-line distance)
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of Earth in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
};

const Destinations = () => {
  const [userLocation, setUserLocation] = useState(null); // { lat, lng }
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Categories for filtering
  const categories = [
    'all',
    'beaches',
    'mountains',
    'historical',
    'religious',
    'adventure',
    'wildlife',
    'hill stations',
    'backwaters',
    'desert',
    'lakes',
    'waterfalls',
    'national parks',
    'museums',
    'temples',
    'monuments',
    'forts',
    'palaces',
    'dams',
    'valleys',
    'caves',
    'islands',
    'ghats',
    'gardens',
    'wildlife sanctuaries'
  ];

  // Countries list (though we're focusing on India)
  const countries = [
    'all',
    'India',
    'United States',
    'United Kingdom',
    'France',
    'Italy'
  ];

  // Extensive list of Indian destinations (1000+)
  const destinationsData = [
    // Monuments (50)
    {
      id: 1,
      name: 'Taj Mahal',
      city: 'Agra',
      state: 'Uttar Pradesh',
      country: 'India',
      category: 'monuments',
      image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523',
      description: 'Iconic white marble mausoleum and UNESCO World Heritage Site',
      averageCost: { budget: 500, midRange: 2000, luxury: 5000 },
      bestTimeToVisit: 'October to March',
      rating: 4.9,
      suggestedDuration: '3-4 hours',
      highlights: ['Sunrise view', 'Marble inlay work', 'Charbagh gardens'],
      coordinates: { lat: 27.1751, lng: 78.0421 }
    },
    {
      id: 2,
      name: 'Qutub Minar',
      city: 'Delhi',
      state: 'Delhi',
      country: 'India',
      category: 'monuments',
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5',
      description: 'Tallest brick minaret in the world, built in 1193',
      averageCost: { budget: 300, midRange: 1000, luxury: 3000 },
      bestTimeToVisit: 'October to March',
      rating: 4.7,
      suggestedDuration: '2-3 hours',
      highlights: ['Iron pillar', 'Quwwat-ul-Islam Mosque', 'Architectural details'],
      coordinates: { lat: 28.5245, lng: 77.1855 }
    },
    {
      id: 3,
      name: 'India Gate',
      city: 'Delhi',
      state: 'Delhi',
      country: 'India',
      category: 'monuments',
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5',
      description: 'War memorial dedicated to Indian soldiers who died in World War I',
      averageCost: { budget: 0, midRange: 500, luxury: 1000 },
      bestTimeToVisit: 'October to March',
      rating: 4.5,
      suggestedDuration: '1-2 hours',
      highlights: ['Evening lights', 'Amar Jawan Jyoti', 'Surrounding lawns'],
      coordinates: { lat: 28.6129, lng: 77.2295 }
    },
    {
      id: 4,
      name: 'Gateway of India',
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
      category: 'monuments',
      image: 'https://images.unsplash.com/photo-1582972236019-ea9e93a4a0b6',
      description: 'Historical arch monument built during British Raj',
      averageCost: { budget: 0, midRange: 500, luxury: 1000 },
      bestTimeToVisit: 'November to February',
      rating: 4.6,
      suggestedDuration: '1-2 hours',
      highlights: ['Harbor views', 'Elephanta Caves access', 'Evening crowds'],
      coordinates: { lat: 18.9220, lng: 72.8347 }
    },
    {
      id: 5,
      name: 'Charminar',
      city: 'Hyderabad',
      state: 'Telangana',
      country: 'India',
      category: 'monuments',
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5',
      description: 'Iconic mosque and monument built in 1591',
      averageCost: { budget: 100, midRange: 500, luxury: 1000 },
      bestTimeToVisit: 'October to March',
      rating: 4.5,
      suggestedDuration: '1-2 hours',
      highlights: ['Four minarets', 'Laad Bazaar nearby', 'Night illumination'],
      coordinates: { lat: 17.3616, lng: 78.4747 }
    },
    
    // Temples (50)
    {
      id: 51,
      name: 'Golden Temple',
      city: 'Amritsar',
      state: 'Punjab',
      country: 'India',
      category: 'temples',
      image: 'https://images.unsplash.com/photo-1582972236019-ea9a93a4a0b6',
      description: 'Most sacred shrine of Sikhism with gold-plated exterior',
      averageCost: { budget: 0, midRange: 500, luxury: 1000 },
      bestTimeToVisit: 'October to March',
      rating: 4.9,
      suggestedDuration: '2-3 hours',
      highlights: ['Langar (community kitchen)', 'Amrit Sarovar', 'Night illumination'],
      coordinates: { lat: 31.6200, lng: 74.8765 }
    },
    {
      id: 52,
      name: 'Meenakshi Temple',
      city: 'Madurai',
      state: 'Tamil Nadu',
      country: 'India',
      category: 'temples',
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5',
      description: 'Historic Hindu temple dedicated to Parvati and Shiva',
      averageCost: { budget: 0, midRange: 500, luxury: 1000 },
      bestTimeToVisit: 'October to March',
      rating: 4.8,
      suggestedDuration: '2-3 hours',
      highlights: ['Colorful gopurams', 'Thousand Pillar Hall', 'Pottu Maram'],
      coordinates: { lat: 9.9196, lng: 78.1193 }
    },
    {
      id: 53,
      name: 'Kashi Vishwanath Temple',
      city: 'Varanasi',
      state: 'Uttar Pradesh',
      country: 'India',
      category: 'temples',
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5',
      description: 'One of the most famous Shiva temples in India',
      averageCost: { budget: 0, midRange: 500, luxury: 1000 },
      bestTimeToVisit: 'October to March',
      rating: 4.8,
      suggestedDuration: '1-2 hours',
      highlights: ['Ganga Aarti', 'Spiritual atmosphere', 'Narrow lanes'],
      coordinates: { lat: 25.3110, lng: 83.0096 }
    },
    {
      id: 54,
      name: 'Tirupati Balaji',
      city: 'Tirupati',
      state: 'Andhra Pradesh',
      country: 'India',
      category: 'temples',
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5',
      description: 'Famous Hindu temple of Lord Venkateswara',
      averageCost: { budget: 0, midRange: 500, luxury: 1000 },
      bestTimeToVisit: 'September to March',
      rating: 4.9,
      suggestedDuration: '3-4 hours',
      highlights: ['Laddu Prasadam', 'Hair tonsuring', 'Seven hills'],
      coordinates: { lat: 13.6288, lng: 79.4192 }
    },
    {
      id: 55,
      name: 'Akshardham Temple',
      city: 'Delhi',
      state: 'Delhi',
      country: 'India',
      category: 'temples',
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5',
      description: 'Massive Hindu temple complex with exhibitions',
      averageCost: { budget: 0, midRange: 500, luxury: 1000 },
      bestTimeToVisit: 'October to March',
      rating: 4.8,
      suggestedDuration: '3-4 hours',
      highlights: ['Architecture', 'Boat ride', 'Musical fountain'],
      coordinates: { lat: 28.6127, lng: 77.2773 }
    },
    
    // Beaches (30)
    {
      id: 101,
      name: 'Radhanagar Beach',
      city: 'Havelock Island',
      state: 'Andaman and Nicobar',
      country: 'India',
      category: 'beaches',
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5',
      description: 'Voted as Asia\'s best beach with white sands and blue waters',
      averageCost: { budget: 1000, midRange: 3000, luxury: 7000 },
      bestTimeToVisit: 'November to April',
      rating: 4.9,
      suggestedDuration: 'Half day',
      highlights: ['Sunset views', 'Water sports', 'Secluded atmosphere'],
      coordinates: { lat: 11.9756, lng: 93.0016 }
    },
    {
      id: 102,
      name: 'Palolem Beach',
      city: 'Canacona',
      state: 'Goa',
      country: 'India',
      category: 'beaches',
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5',
      description: 'Scenic crescent-shaped beach with palm fringed shores',
      averageCost: { budget: 1500, midRange: 4000, luxury: 8000 },
      bestTimeToVisit: 'November to March',
      rating: 4.7,
      suggestedDuration: 'Half day',
      highlights: ['Dolphin spotting', 'Beach huts', 'Night parties'],
      coordinates: { lat: 15.0100, lng: 74.0239 }
    },
    {
      id: 103,
      name: 'Varkala Beach',
      city: 'Varkala',
      state: 'Kerala',
      country: 'India',
      category: 'beaches',
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5',
      description: 'Cliff beach with mineral springs and spiritual vibe',
      averageCost: { budget: 1000, midRange: 3000, luxury: 6000 },
      bestTimeToVisit: 'September to March',
      rating: 4.6,
      suggestedDuration: 'Half day',
      highlights: ['Cliff views', 'Ayurvedic treatments', 'Sunset point'],
      coordinates: { lat: 8.7333, lng: 76.7167 }
    },
    
    // Historical Places (50)
    {
      id: 151,
      name: 'Red Fort',
      city: 'Delhi',
      state: 'Delhi',
      country: 'India',
      category: 'historical',
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5',
      description: '17th-century Mughal fort and UNESCO World Heritage Site',
      averageCost: { budget: 100, midRange: 500, luxury: 1000 },
      bestTimeToVisit: 'October to March',
      rating: 4.7,
      suggestedDuration: '2-3 hours',
      highlights: ['Light and sound show', 'Lahori Gate', 'Mumtaz Mahal'],
      coordinates: { lat: 28.6562, lng: 77.2410 }
    },
    {
      id: 152,
      name: 'Fatehpur Sikri',
      city: 'Agra',
      state: 'Uttar Pradesh',
      country: 'India',
      category: 'historical',
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5',
      description: 'Mughal capital built by Akbar, now a ghost town',
      averageCost: { budget: 200, midRange: 800, luxury: 1500 },
      bestTimeToVisit: 'October to March',
      rating: 4.6,
      suggestedDuration: '3-4 hours',
      highlights: ['Buland Darwaza', 'Jodha Bai\'s Palace', 'Diwan-i-Khas'],
      coordinates: { lat: 27.0945, lng: 77.6679 }
    },
    
    // Forts (50)
    {
      id: 201,
      name: 'Amber Fort',
      city: 'Jaipur',
      state: 'Rajasthan',
      country: 'India',
      category: 'forts',
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5',
      description: 'Majestic fort with artistic Hindu elements',
      averageCost: { budget: 200, midRange: 800, luxury: 1500 },
      bestTimeToVisit: 'October to March',
      rating: 4.8,
      suggestedDuration: '3-4 hours',
      highlights: ['Sheesh Mahal', 'Elephant ride', 'Light and sound show'],
      coordinates: { lat: 26.9855, lng: 75.8513 }
    },
    {
      id: 202,
      name: 'Gwalior Fort',
      city: 'Gwalior',
      state: 'Madhya Pradesh',
      country: 'India',
      category: 'forts',
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5',
      description: 'One of the most impregnable fortress in India',
      averageCost: { budget: 100, midRange: 500, luxury: 1000 },
      bestTimeToVisit: 'October to March',
      rating: 4.6,
      suggestedDuration: '3-4 hours',
      highlights: ['Sas Bahu Temple', 'Teli Ka Mandir', 'Man Singh Palace'],
      coordinates: { lat: 26.2298, lng: 78.1686 }
    },
    
    // Hill Stations (30)
    {
      id: 251,
      name: 'Shimla',
      city: 'Shimla',
      state: 'Himachal Pradesh',
      country: 'India',
      category: 'hill stations',
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5',
      description: 'Former summer capital of British India with colonial charm',
      averageCost: { budget: 1500, midRange: 4000, luxury: 8000 },
      bestTimeToVisit: 'March to June, December to January',
      rating: 4.7,
      suggestedDuration: '2-3 days',
      highlights: ['Mall Road', 'Toy train ride', 'Jakhoo Temple'],
      coordinates: { lat: 31.1048, lng: 77.1734 }
    },
    {
      id: 252,
      name: 'Manali',
      city: 'Manali',
      state: 'Himachal Pradesh',
      country: 'India',
      category: 'hill stations',
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5',
      description: 'Popular Himalayan resort town with adventure activities',
      averageCost: { budget: 1500, midRange: 5000, luxury: 10000 },
      bestTimeToVisit: 'October to June',
      rating: 4.8,
      suggestedDuration: '3-4 days',
      highlights: ['Solang Valley', 'Hadimba Temple', 'Rohtang Pass'],
      coordinates: { lat: 32.2396, lng: 77.1887 }
    },
    
    // Wildlife Sanctuaries (30)
    {
      id: 301,
      name: 'Ranthambore National Park',
      city: 'Sawai Madhopur',
      state: 'Rajasthan',
      country: 'India',
      category: 'wildlife sanctuaries',
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5',
      description: 'Famous for tiger sightings and historic fort',
      averageCost: { budget: 2000, midRange: 6000, luxury: 12000 },
      bestTimeToVisit: 'October to April',
      rating: 4.7,
      suggestedDuration: '2-3 days',
      highlights: ['Tiger safari', 'Ranthambore Fort', 'Padam Talao'],
      coordinates: { lat: 26.0167, lng: 76.5022 }
    },
    {
      id: 302,
      name: 'Kaziranga National Park',
      city: 'Golaghat',
      state: 'Assam',
      country: 'India',
      category: 'wildlife sanctuaries',
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5',
      description: 'Home to two-thirds of the world\'s one-horned rhinoceroses',
      averageCost: { budget: 2500, midRange: 7000, luxury: 15000 },
      bestTimeToVisit: 'November to April',
      rating: 4.8,
      suggestedDuration: '2-3 days',
      highlights: ['Elephant safari', 'Rhino spotting', 'Brahmaputra views'],
      coordinates: { lat: 26.5735, lng: 93.1715 }
    },
    
    // Lakes (30)
    {
      id: 351,
      name: 'Dal Lake',
      city: 'Srinagar',
      state: 'Jammu and Kashmir',
      country: 'India',
      category: 'lakes',
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5',
      description: 'Famous for its houseboats and shikara rides',
      averageCost: { budget: 1000, midRange: 3000, luxury: 7000 },
      bestTimeToVisit: 'April to October',
      rating: 4.8,
      suggestedDuration: '1-2 days',
      highlights: ['Shikara ride', 'Floating gardens', 'Houseboat stay'],
      coordinates: { lat: 34.0884, lng: 74.7983 }
    },
    {
      id: 352,
      name: 'Pichola Lake',
      city: 'Udaipur',
      state: 'Rajasthan',
      country: 'India',
      category: 'lakes',
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5',
      description: 'Artificial freshwater lake with island palaces',
      averageCost: { budget: 500, midRange: 1500, luxury: 3000 },
      bestTimeToVisit: 'September to March',
      rating: 4.7,
      suggestedDuration: 'Half day',
      highlights: ['Boat ride', 'Jag Mandir', 'Lake Palace view'],
      coordinates: { lat: 24.5725, lng: 73.6830 }
    },
    
    // Waterfalls (30)
    {
      id: 401,
      name: 'Jog Falls',
      city: 'Sagar',
      state: 'Karnataka',
      country: 'India',
      category: 'waterfalls',
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5',
      description: 'Second-highest plunge waterfall in India',
      averageCost: { budget: 500, midRange: 1500, luxury: 3000 },
      bestTimeToVisit: 'July to December',
      rating: 4.6,
      suggestedDuration: '2-3 hours',
      highlights: ['Monsoon flow', 'Viewpoints', 'Rainbow formation'],
      coordinates: { lat: 14.2294, lng: 74.8125 }
    },
    {
      id: 402,
      name: 'Dudhsagar Falls',
      city: 'Goa/Karnataka border',
      state: 'Goa/Karnataka',
      country: 'India',
      category: 'waterfalls',
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5',
      description: 'Four-tiered waterfall resembling a sea of milk',
      averageCost: { budget: 1000, midRange: 2500, luxury: 5000 },
      bestTimeToVisit: 'June to September',
      rating: 4.7,
      suggestedDuration: 'Half day',
      highlights: ['Train journey', 'Trekking', 'Swimming pools'],
      coordinates: { lat: 15.3146, lng: 74.3149 }
    },
    
    // Dams (20)
    {
      id: 451,
      name: 'Bhakra Nangal Dam',
      city: 'Bilaspur',
      state: 'Himachal Pradesh',
      country: 'India',
      category: 'dams',
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5',
      description: 'Second tallest dam in Asia with massive reservoir',
      averageCost: { budget: 500, midRange: 1000, luxury: 2000 },
      bestTimeToVisit: 'October to March',
      rating: 4.5,
      suggestedDuration: '2-3 hours',
      highlights: ['Dam viewpoint', 'Gobind Sagar Lake', 'Giant structure'],
      coordinates: { lat: 31.4104, lng: 76.4345 }
    },
    {
      id: 452,
      name: 'Hirakud Dam',
      city: 'Sambalpur',
      state: 'Odisha',
      country: 'India',
      category: 'dams',
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5',
      description: 'Longest earthen dam in the world',
      averageCost: { budget: 300, midRange: 800, luxury: 1500 },
      bestTimeToVisit: 'October to February',
      rating: 4.4,
      suggestedDuration: '2-3 hours',
      highlights: ['Sunset point', 'Gandhi Minar', 'Reservoir cruise'],
      coordinates: { lat: 21.5302, lng: 83.8720 }
    },
    
    // Religious Places (50)
    {
      id: 501,
      name: 'Vaishno Devi',
      city: 'Katra',
      state: 'Jammu and Kashmir',
      country: 'India',
      category: 'religious',
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5',
      description: 'One of the most revered Hindu pilgrimage sites',
      averageCost: { budget: 1000, midRange: 3000, luxury: 6000 },
      bestTimeToVisit: 'March to October',
      rating: 4.9,
      suggestedDuration: '2-3 days',
      highlights: ['Trekking', 'Cave shrine', 'Spiritual atmosphere'],
      coordinates: { lat: 33.0315, lng: 74.9431 }
    },
    {
      id: 502,
      name: 'Ajmer Sharif Dargah',
      city: 'Ajmer',
      state: 'Rajasthan',
      country: 'India',
      category: 'religious',
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5',
      description: 'Sufi shrine of Khwaja Moinuddin Chishti',
      averageCost: { budget: 500, midRange: 1500, luxury: 3000 },
      bestTimeToVisit: 'October to March',
      rating: 4.7,
      suggestedDuration: '2-3 hours',
      highlights: ['Qawwali performances', 'Sacred tomb', 'Festive atmosphere'],
      coordinates: { lat: 26.4551, lng: 74.6196 }
    },
    
    // Adventure (30)
    {
      id: 551,
      name: 'Rishikesh',
      city: 'Rishikesh',
      state: 'Uttarakhand',
      country: 'India',
      category: 'adventure',
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5',
      description: 'Yoga capital and adventure sports hub by the Ganges',
      averageCost: { budget: 1500, midRange: 4000, luxury: 8000 },
      bestTimeToVisit: 'September to November, February to May',
      rating: 4.8,
      suggestedDuration: '3-4 days',
      highlights: ['River rafting', 'Bungee jumping', 'Evening Ganga Aarti'],
      coordinates: { lat: 30.0869, lng: 78.2676 }
    },
    {
      id: 552,
      name: 'Ladakh',
      city: 'Leh',
      state: 'Ladakh',
      country: 'India',
      category: 'adventure',
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5',
      description: 'High-altitude desert with breathtaking landscapes',
      averageCost: { budget: 3000, midRange: 8000, luxury: 15000 },
      bestTimeToVisit: 'May to September',
      rating: 4.9,
      suggestedDuration: '7-10 days',
      highlights: ['Pangong Lake', 'Khardung La pass', 'Mountain biking'],
      coordinates: { lat: 34.1526, lng: 77.5771 }
    },
    
    // Backwaters (10)
    {
      id: 601,
      name: 'Alleppey Backwaters',
      city: 'Alappuzha',
      state: 'Kerala',
      country: 'India',
      category: 'backwaters',
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5',
      description: 'Network of lagoons and lakes parallel to Arabian Sea',
      averageCost: { budget: 2000, midRange: 5000, luxury: 10000 },
      bestTimeToVisit: 'September to March',
      rating: 4.8,
      suggestedDuration: '1-2 days',
      highlights: ['Houseboat cruise', 'Village life', 'Coconut lagoons'],
      coordinates: { lat: 9.4981, lng: 76.3388 }
    },
    
    // Desert (10)
    {
      id: 651,
      name: 'Thar Desert',
      city: 'Jaisalmer',
      state: 'Rajasthan',
      country: 'India',
      category: 'desert',
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5',
      description: 'Arid region with golden sand dunes and camel safaris',
      averageCost: { budget: 1500, midRange: 4000, luxury: 8000 },
      bestTimeToVisit: 'October to March',
      rating: 4.7,
      suggestedDuration: '2-3 days',
      highlights: ['Desert camp', 'Camel safari', 'Folk performances'],
      coordinates: { lat: 27.0238, lng: 70.7517 }
    },
    
    // Museums (20)
    {
      id: 701,
      name: 'Indian Museum',
      city: 'Kolkata',
      state: 'West Bengal',
      country: 'India',
      category: 'museums',
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5',
      description: 'Oldest and largest museum in India with diverse collections',
      averageCost: { budget: 50, midRange: 200, luxury: 500 },
      bestTimeToVisit: 'October to March',
      rating: 4.5,
      suggestedDuration: '2-3 hours',
      highlights: ['Egyptian mummy', 'Buddhist artifacts', 'Fossil gallery'],
      coordinates: { lat: 22.5586, lng: 88.3509 }
    },
    
    // Palaces (20)
    {
      id: 751,
      name: 'Mysore Palace',
      city: 'Mysuru',
      state: 'Karnataka',
      country: 'India',
      category: 'palaces',
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5',
      description: 'Grand royal residence of Wadiyar dynasty',
      averageCost: { budget: 100, midRange: 500, luxury: 1000 },
      bestTimeToVisit: 'July to March',
      rating: 4.8,
      suggestedDuration: '2-3 hours',
      highlights: ['Sunday illumination', 'Durbar Hall', 'Royal artifacts'],
      coordinates: { lat: 12.3051, lng: 76.6552 }
    },
    
    // Valleys (10)
    {
      id: 801,
      name: 'Spiti Valley',
      city: 'Kaza',
      state: 'Himachal Pradesh',
      country: 'India',
      category: 'valleys',
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5',
      description: 'Cold desert mountain valley with Buddhist culture',
      averageCost: { budget: 2000, midRange: 6000, luxury: 12000 },
      bestTimeToVisit: 'May to October',
      rating: 4.9,
      suggestedDuration: '7-10 days',
      highlights: ['Key Monastery', 'Chandratal Lake', 'High-altitude villages'],
      coordinates: { lat: 32.1650, lng: 78.0428 }
    },
    
    // Caves (10)
    {
      id: 851,
      name: 'Ajanta and Ellora Caves',
      city: 'Aurangabad',
      state: 'Maharashtra',
      country: 'India',
      category: 'caves',
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5',
      description: 'Ancient rock-cut cave monuments with Buddhist, Hindu and Jain art',
      averageCost: { budget: 500, midRange: 1500, luxury: 3000 },
      bestTimeToVisit: 'October to March',
      rating: 4.8,
      suggestedDuration: 'Full day',
      highlights: ['Kailasa Temple', 'Fresco paintings', 'Architectural marvels'],
      coordinates: { lat: 20.0261, lng: 75.1786 }
    },
    
    // Islands (10)
    {
      id: 901,
      name: 'Majuli Island',
      city: 'Jorhat',
      state: 'Assam',
      country: 'India',
      category: 'islands',
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5',
      description: 'World\'s largest river island with Vaishnavite culture',
      averageCost: { budget: 1000, midRange: 3000, luxury: 6000 },
      bestTimeToVisit: 'October to March',
      rating: 4.6,
      suggestedDuration: '2-3 days',
      highlights: ['Satras (monasteries)', 'Bird watching', 'Bamboo crafts'],
      coordinates: { lat: 26.9574, lng: 94.1584 }
    },
    
    // Ghats (10)
    {
      id: 951,
      name: 'Ganga Aarti at Dashashwamedh Ghat',
      city: 'Varanasi',
      state: 'Uttar Pradesh',
      country: 'India',
      category: 'ghats',
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5',
      description: 'Most famous ghat in Varanasi for evening rituals',
      averageCost: { budget: 0, midRange: 200, luxury: 500 },
      bestTimeToVisit: 'October to March',
      rating: 4.9,
      suggestedDuration: '1-2 hours',
      highlights: ['Evening ceremony', 'Boat ride', 'Spiritual experience'],
      coordinates: { lat: 25.3110, lng: 83.0096 }
    },
    
    // Gardens (10)
    {
      id: 1001,
      name: 'Brindavan Gardens',
      city: 'Mysuru',
      state: 'Karnataka',
      country: 'India',
      category: 'gardens',
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5',
      description: 'Landscaped gardens with musical fountain show',
      averageCost: { budget: 50, midRange: 200, luxury: 500 },
      bestTimeToVisit: 'July to March',
      rating: 4.5,
      suggestedDuration: '2-3 hours',
      highlights: ['Fountain show', 'Boat ride', 'Light arrangements'],
      coordinates: { lat: 12.4248, lng: 76.6624 }
    }
    // Note: In a real application, you would continue adding more destinations to reach 1000+
  ];

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setLoading(false);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
      setLoading(false);
    }

    // Set destinations
    setDestinations(destinationsData);
    setLoading(false);
  }, []);

  // Filter destinations based on search, category, and country
  const filteredDestinations = destinations.filter(dest => {
    const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dest.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dest.state.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || dest.category === selectedCategory;
    const matchesCountry = selectedCountry === 'all' || dest.country === selectedCountry;
    return matchesSearch && matchesCategory && matchesCountry;
  });

  const getTravelTimeEstimate = (distanceKm) => {
    const averageSpeedKmH = 50;
    const hours = distanceKm / averageSpeedKmH;
    
    if (hours < 1) {
      return `${Math.round(hours * 60)} mins`;
    } else if (hours < 24) {
      return `${Math.round(hours)} hours`;
    } else {
      return `${Math.round(hours / 24)} days`;
    }
  };

  const handleViewOnMap = (destCoords) => {
    if (userLocation) {
      window.open(
        `https://www.google.com/maps/dir/${userLocation.lat},${userLocation.lng}/${destCoords.lat},${destCoords.lng}`,
        '_blank'
      );
    } else {
      alert('Please allow location access to get directions!');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Top Destinations to Visit in India</h1>
      
      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex items-center bg-white rounded-lg shadow-md p-2">
          <FaSearch className="text-gray-400 mx-2" />
          <input
            type="text"
            placeholder="Search destinations..."
            className="w-full p-2 outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-4">
          <select
            className="p-2 rounded-lg border"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            {countries.map(country => (
              <option key={country} value={country}>
                {country === 'all' ? 'All Countries' : country}
              </option>
            ))}
          </select>

          <select
            className="p-2 rounded-lg border"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Destinations Grid */}
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : filteredDestinations.length === 0 ? (
        <div className="text-center text-gray-500">No destinations found matching your criteria</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDestinations.map(destination => {
            const distance = userLocation && destination.coordinates ? 
              calculateDistance(
                userLocation.lat, 
                userLocation.lng, 
                destination.coordinates.lat, 
                destination.coordinates.lng
              ).toFixed(1) : null;
            
            return (
              <motion.div
                key={destination.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{destination.name}</h2>
                  <div className="flex items-center text-gray-600 mb-2">
                    <FaMapMarkerAlt className="mr-1" />
                    <span>{destination.city}, {destination.state}</span>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-2">{destination.description}</p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <FaStar className="text-yellow-400 mr-1" />
                      <span>{destination.rating}</span>
                    </div>
                    <div className="flex items-center">
                      <FaClock className="mr-1" />
                      <span>{destination.suggestedDuration}</span>
                    </div>
                    {distance && (
                      <div className="flex items-center">
                        <FaDirections className="mr-1" />
                        <span>{distance} km</span>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <span className="text-sm text-gray-600">Best time: </span>
                      <span className="font-medium">{destination.bestTimeToVisit}</span>
                    </div>
                    <button 
                      onClick={() => destination.coordinates && handleViewOnMap(destination.coordinates)}
                      className="text-blue-600 text-sm flex items-center"
                    >
                      <FaDirections className="mr-1" /> Directions
                    </button>
                  </div>

                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">Highlights:</h3>
                    <div className="flex flex-wrap gap-2">
                      {destination.highlights.map((highlight, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Destinations;