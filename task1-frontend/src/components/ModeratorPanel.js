import React, { useState } from 'react';
import { generalAPI } from '../services/api';

const ModeratorPanel = () => {
  const [reports, setReports] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchReports = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await generalAPI.moderatorReports();
      setReports(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch reports');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="moderator-panel">
      <div className="panel-header">
        <h1>🛡️ Moderator Panel</h1>
        <p>Access moderator-specific features and reports</p>
      </div>

      <div className="card">
        <h3>Moderator Reports</h3>
        <p>Click the button below to fetch moderator reports from the API.</p>
        <button
          className="btn btn-primary"
          onClick={fetchReports}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Fetch Reports'}
        </button>

        {error && <div className="alert alert-error" style={{ marginTop: '1rem' }}>{error}</div>}

        {reports && (
          <div className="response-section" style={{ marginTop: '1rem' }}>
            <h4>Reports Response:</h4>
            <div className="response-content">
              {JSON.stringify(reports, null, 2)}
            </div>
          </div>
        )}
      </div>

      <div className="dashboard-grid" style={{ marginTop: '2rem' }}>
        <div className="card">
          <h3>📊 Statistics</h3>
          <p>View moderation statistics and metrics</p>
        </div>

        <div className="card">
          <h3>🚫 Reported Content</h3>
          <p>Review and moderate reported content</p>
        </div>

        <div className="card">
          <h3>⚠️ Pending Actions</h3>
          <p>Handle pending moderation actions</p>
        </div>
      </div>
    </div>
  );
};

export default ModeratorPanel;
