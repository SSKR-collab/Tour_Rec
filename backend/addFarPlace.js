import mongoose from 'mongoose';
import Place from './src/models/Place.js';

const MONGO_URI = 'mongodb://localhost:27017/tour'; // Change if your DB name is different

async function addFarPlace() {
  await mongoose.connect(MONGO_URI);

  const farPlace = new Place({
    placeId: 'far_test_place',
    name: 'Gateway of India',
    address: 'Mumbai, Maharashtra, India',
    location: { lat: 18.9219841, lng: 72.8346543 },
    types: ['tourist_attraction'],
    rating: 4.7,
    user_ratings_total: 10000,
    photoUrl: null,
    cost: 0,
    duration: 120,
  });

  await farPlace.save();
  console.log('Far place added!');
  process.exit();
}

addFarPlace().catch(e => { console.error(e); process.exit(1); }); 