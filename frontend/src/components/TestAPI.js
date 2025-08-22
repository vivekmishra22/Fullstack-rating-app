import React, { useEffect, useState } from 'react';
import { getStores } from '../api/auth.api';

const TestAPI = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const testConnection = async () => {
      try {
        const response = await getStores();
        setStores(response.data.stores || []);
      } catch (error) {
        console.error('API connection failed:', error);
      } finally {
        setLoading(false);
      }
    };

    testConnection();
  }, []);

  if (loading) return <div>Testing API connection...</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">API Connection Test</h2>
      <p>Stores count: {stores.length}</p>
      <pre>{JSON.stringify(stores, null, 2)}</pre>
    </div>
  );
};

export default TestAPI;