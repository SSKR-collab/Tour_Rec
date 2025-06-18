import axios from 'axios';

const API_URL = 'http://localhost:5002/api';

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

export const verifyGoogleToken = async (credential) => {
    try {
        const response = await axios.post(`${API_URL}/auth/google-verify`, {
            credential
        }, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error('Error in verifyGoogleToken:', error);
        throw error;
    }
};