import React, { useState } from 'react';
import { generalAPI } from '../services/api';

const ApiTest = () => {
  const [responses, setResponses] = useState({});
  const [loading, setLoading] = useState({});

  const testEndpoint = async (name, apiCall) => {
    setLoading({ ...loading, [name]: true });
    try {
      const response = await apiCall();
      setResponses({ ...responses, [name]: response.data });
    } catch (error) {
      setResponses({
        ...responses,
        [name]: {
          error: error.response?.data?.error || error.message,
          status: error.response?.status,
        },
      });
    } finally {
      setLoading({ ...loading, [name]: false });
    }
  };

  const endpoints = [
    {
      name: 'Health Check',
      method: 'GET',
      path: '/api/health',
      description: 'Check if the API is running (Public)',
      call: () => generalAPI.healthCheck(),
    },
    {
      name: 'Get Users',
      method: 'GET',
      path: '/api/users',
      description: 'Get list of users (Protected - Any authenticated user)',
      call: () => generalAPI.getUsers(),
    },
    {
      name: 'Admin Dashboard',
      method: 'GET',
      path: '/api/admin/dashboard',
      description: 'Access admin dashboard (Protected - Admin only)',
      call: () => generalAPI.adminDashboard(),
    },
    {
      name: 'Moderator Reports',
      method: 'GET',
      path: '/api/moderator/reports',
      description: 'Get moderator reports (Protected - Moderator/Admin)',
      call: () => generalAPI.moderatorReports(),
    },
  ];

  return (
    <div className="api-test">
      <div className="api-test-header">
        <h1>API Endpoint Testing</h1>
        <p>Test various API endpoints with your authentication token</p>
      </div>

      <div className="endpoint-list">
        {endpoints.map((endpoint) => (
          <div key={endpoint.name} className="endpoint-card">
            <div className="endpoint-header">
              <span className={`method-badge ${endpoint.method.toLowerCase()}`}>
                {endpoint.method}
              </span>
              <span className="endpoint-path">{endpoint.path}</span>
            </div>
            
            <div className="endpoint-info">
              <p>{endpoint.description}</p>
            </div>

            <button
              className="btn btn-primary"
              onClick={() => testEndpoint(endpoint.name, endpoint.call)}
              disabled={loading[endpoint.name]}
            >
              {loading[endpoint.name] ? 'Testing...' : 'Test Endpoint'}
            </button>

            {responses[endpoint.name] && (
              <div className="response-section">
                <h4>Response:</h4>
                <div className="response-content">
                  {JSON.stringify(responses[endpoint.name], null, 2)}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApiTest;
