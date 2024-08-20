import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080', // Zamenite sa URL-om vašeg backend-a
    headers: {
        'Content-Type': 'application/json',
    },
});

// Dodajte interceptor za dodavanje JWT u zaglavlje svakog zahteva
axiosInstance.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default axiosInstance;
