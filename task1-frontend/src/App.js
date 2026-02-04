import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import Signup from './components/Signup';
import NewDashboard from './components/NewDashboard';
import AllTasks from './components/AllTasks';
import UserTasks from './components/UserTasks';
import ApiTest from './components/ApiTest';
import AdminPanel from './components/AdminPanel';
import ModeratorPanel from './components/ModeratorPanel';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Layout>
                    <NewDashboard />
                  </Layout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/tasks" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <Layout>
                    <AllTasks />
                  </Layout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/my-tasks" 
              element={
                <ProtectedRoute>
                  <Layout>
                    <UserTasks />
                  </Layout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/api-test" 
              element={
                <ProtectedRoute>
                  <Layout>
                    <ApiTest />
                  </Layout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <Layout>
                    <AdminPanel />
                  </Layout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/moderator" 
              element={
                <ProtectedRoute requiredRole="moderator">
                  <Layout>
                    <ModeratorPanel />
                  </Layout>
                </ProtectedRoute>
              } 
            />
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
