import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('fb_token');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export const facebookLogin = async () => {
  const response = await api.get('/auth/facebook/login');
  return response.data.authUrl;
};

export const getProperties = async () => {
  const response = await api.get('/properties');
  return response.data;
};

export const getProperty = async (id) => {
  const response = await api.get(`/properties/${id}`);
  return response.data;
};

export const postToFacebook = async (data) => {
  const response = await api.post('/post/facebook', data);
  return response.data;
};

export const checkAuthStatus = async () => {
  try {
    const token = localStorage.getItem('fb_token');
    if (!token) {
      return { authenticated: false };
    }
    
    return { authenticated: true };
  } catch (error) {
    console.error('Auth check failed:', error);
    return { authenticated: false };
  }
};