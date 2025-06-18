import React from 'react';
import { FaPlaceOfWorship, FaUtensils, FaShoppingBag, FaTree, FaLandmark } from 'react-icons/fa';
import { MdMuseum } from 'react-icons/md';

const PREFERENCES = [
  { key: 'museum', label: 'Museum', icon: <MdMuseum className="text-2xl" /> },
  { key: 'park', label: 'Park', icon: <FaTree className="text-2xl" /> },
  { key: 'temple', label: 'Temple', icon: <FaPlaceOfWorship className="text-2xl" /> },
  { key: 'monument', label: 'Monument', icon: <FaLandmark className="text-2xl" /> },
  { key: 'shopping', label: 'Shopping', icon: <FaShoppingBag className="text-2xl" /> },
  { key: 'food', label: 'Food', icon: <FaUtensils className="text-2xl" /> },
];

const PreferenceForm = ({ preferences, onInterestToggle, onSubmit, disabled }) => {
  return (
    <div>
      <div className="rounded-2xl bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 p-6 mb-6 shadow-lg text-white text-center">
        <h2 className="text-3xl font-bold mb-2">What are you interested in?</h2>
        <p className="text-lg">Select your travel preferences</p>
      </div>
      <form onSubmit={e => { e.preventDefault(); onSubmit(); }}>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          {PREFERENCES.map(pref => (
            <button
              type="button"
              key={pref.key}
              className={`flex flex-col items-center justify-center p-4 rounded-xl shadow-md transition-all border-2 focus:outline-none
                ${preferences.interests.includes(pref.key)
                  ? 'bg-white border-blue-600 text-blue-700 scale-105'
                  : 'bg-gray-100 border-transparent text-gray-700 hover:bg-blue-100 hover:scale-105'}`}
              onClick={() => onInterestToggle(pref.key)}
              disabled={disabled}
            >
              {pref.icon}
              <span className="mt-2 font-semibold">{pref.label}</span>
            </button>
          ))}
        </div>
        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-lg transition-colors disabled:opacity-50"
          disabled={disabled}
        >
          Save Preferences
        </button>
      </form>
    </div>
  );
};

export default PreferenceForm;