import React, { useState, useEffect } from 'react';
import { UserCircleIcon, ArrowLeftOnRectangleIcon, Cog6ToothIcon, CubeTransparentIcon, ShoppingBagIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import config from '../constants.js';

const DashboardPage = ({ user, onLogout, manifest, backendStatus }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (user.role === 'customer') {
          const restaurantResponse = await manifest.from('restaurant').find();
          setRestaurants(restaurantResponse.data || []);
          const orderResponse = await manifest.from('order').with(['restaurant']).find({ filter: { customer: user.id }, orderBy: 'createdAt', order: 'DESC' });
          setOrders(orderResponse.data || []);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, manifest]);

  const StatusIndicator = ({ status }) => (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
      {status ? 'Online' : 'Offline'}
    </span>
  );

  const Header = () => (
    <header className="bg-white shadow-sm p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-gray-900">MarsDash</h1>
            <StatusIndicator status={backendStatus} />
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="font-semibold text-gray-800">{user.name}</p>
            <p className="text-sm text-gray-500 capitalize">{user.role}</p>
          </div>
          <UserCircleIcon className="h-10 w-10 text-gray-400" />
          {user.role === 'admin' && (
            <a href={`${config.BACKEND_URL}/admin`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-gray-100">
              <Cog6ToothIcon className="h-6 w-6 text-gray-600" />
            </a>
          )}
          <button onClick={onLogout} className="p-2 rounded-full hover:bg-gray-100">
            <ArrowLeftOnRectangleIcon className="h-6 w-6 text-red-600" />
          </button>
        </div>
      </div>
    </header>
  );

  const renderCustomerDashboard = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Restaurants</h2>
        {restaurants.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {restaurants.map(r => (
              <div key={r.id} className="bg-white rounded-lg shadow overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
                <img src={r.logo?.url || 'https://via.placeholder.com/400x200'} alt={r.name} className="h-40 w-full object-cover" />
                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-900">{r.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{r.description}</p>
                  <span className="inline-block bg-red-100 text-red-800 text-xs font-semibold mt-2 px-2.5 py-0.5 rounded-full">{r.cuisine}</span>
                </div>
              </div>
            ))}
          </div>
        ) : <p className="text-gray-500">No restaurants available on Mars yet.</p>}
      </div>
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">My Orders</h2>
        {orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map(o => (
              <div key={o.id} className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-800">{o.restaurant?.name}</p>
                  <p className="text-sm text-gray-500">Total: ${o.totalPrice}</p>
                </div>
                <span className={`capitalize text-sm font-medium px-3 py-1 rounded-full ${o.status === 'delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{o.status.replace('_', ' ')}</span>
              </div>
            ))}
          </div>
        ) : <p className="text-gray-500">You haven't placed any orders.</p>}
      </div>
    </div>
  );

  const renderRoleDashboard = () => {
    if (loading) {
      return <div className="text-center py-10"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div><p className="mt-2 text-gray-500">Loading Martian Data...</p></div>;
    }
    switch (user.role) {
      case 'customer':
        return renderCustomerDashboard();
      case 'courier':
        return (
            <div className="text-center bg-white p-8 rounded-lg shadow">
                <CubeTransparentIcon className="h-12 w-12 mx-auto text-red-500" />
                <h2 className="mt-4 text-2xl font-semibold text-gray-800">Courier Dashboard</h2>
                <p className="mt-2 text-gray-600">Delivery assignments will appear here. Stay tuned for system updates!</p>
            </div>
        );
      case 'admin':
        return (
            <div className="text-center bg-white p-8 rounded-lg shadow">
                <Cog6ToothIcon className="h-12 w-12 mx-auto text-red-500" />
                <h2 className="mt-4 text-2xl font-semibold text-gray-800">Admin Access</h2>
                <p className="mt-2 text-gray-600">All management functions are available in the dedicated Admin Panel.</p>
                <a href={`${config.BACKEND_URL}/admin`} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">Go to Admin Panel <ChevronRightIcon className="h-5 w-5 ml-1"/></a>
            </div>
        );
      default:
        return <p>Invalid user role.</p>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {renderRoleDashboard()}
      </main>
    </div>
  );
};

export default DashboardPage;
