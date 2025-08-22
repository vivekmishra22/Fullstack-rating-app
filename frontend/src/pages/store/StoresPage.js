import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/auth.context';
import { getStores } from '../api/auth.api';

const StoresPage = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await getStores();
        setStores(response.data.stores);
      } catch (error) {
        console.error('Failed to fetch stores:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, [token]);

  if (loading) return <div>Loading stores...</div>;

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Stores</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stores.map(store => (
          <div key={store.id} className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-900">{store.name}</h3>
            <p className="text-gray-600 mt-2">{store.address}</p>
            <p className="text-blue-600 font-medium mt-2">
              Rating: {store.average_rating || 'No ratings yet'}
            </p>
            <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
              Rate This Store
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoresPage;

// import React from 'react';

// const StoresPage = () => {
//   return (
//     <div className="max-w-6xl mx-auto">
//       <h1 className="text-3xl font-bold text-gray-900 mb-8">Stores</h1>
//       <div className="bg-white rounded-lg shadow-md p-6">
//         <p className="text-gray-600">Stores page content will be here soon.</p>
//       </div>
//     </div>
//   );
// };

// export default StoresPage;