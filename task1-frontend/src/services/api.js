import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  signup: (userData) => api.post('/auth/signup', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getProfile: () => api.get('/auth/me'),
  getAllUsers: () => api.get('/auth/users'),
};

// General API
export const generalAPI = {
  healthCheck: () => api.get('/api/health'),
  getUsers: () => api.get('/api/users'),
  createUser: (userData) => api.post('/api/users', userData),
  adminDashboard: () => api.get('/api/admin/dashboard'),
  moderatorReports: () => api.get('/api/moderator/reports'),
};

// Task API
export const taskAPI = {
  createTask: (taskData) => api.post('/api/tasks', taskData),
  getAllTasks: () => api.get('/api/tasks'),
  getTaskById: (taskId) => api.get(`/api/tasks/${taskId}`),
  getMyTasks: () => api.get('/api/tasks/my-tasks'),
  updateTask: (taskId, taskData) => api.put(`/api/tasks/${taskId}`, taskData),
  deleteTask: (taskId) => api.delete(`/api/tasks/${taskId}`),
  updateTaskStatus: (taskId, status) => api.patch(`/api/tasks/${taskId}/status`, { status }),
  getTaskStatistics: () => api.get('/api/tasks/stats/overview'),
};

export default api;
