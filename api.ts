import axios from 'axios';

// Replace with your Render/Heroku backend URL after deployment
const API_URL = 'https://your-backend-service.onrender.com';

export const getRestaurants = () => axios.get(`${API_URL}/restaurants`);
export const placeOrder = (orderData) => axios.post(`${API_URL}/orders`, orderData);