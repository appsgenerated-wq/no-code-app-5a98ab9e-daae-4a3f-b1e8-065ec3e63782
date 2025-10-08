import React, { useState } from 'react';
import { RocketLaunchIcon, UserPlusIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid';

const LandingPage = ({ onLogin, onSignup }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (isLogin) {
        await onLogin(formData.email, formData.password);
      } else {
        await onSignup(formData.email, formData.password, formData.name);
      }
    } catch (err) {
      setError(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center p-4" style={{ backgroundImage: `radial-gradient(circle at top, #4a0e0e, #1f2937)` }}>
      <div className="text-center mb-8">
        <RocketLaunchIcon className="h-16 w-16 mx-auto text-red-500 mb-4" />
        <h1 className="text-5xl font-bold tracking-tight">MarsDash</h1>
        <p className="text-xl text-gray-300 mt-2">Interplanetary Food Delivery. Right to your habitat.</p>
      </div>

      <div className="w-full max-w-md bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-lg shadow-2xl p-8 border border-gray-700">
        <div className="flex mb-6 bg-gray-900 rounded-lg p-1">
          <button onClick={() => setIsLogin(true)} className={`w-1/2 py-2.5 text-sm font-medium leading-5 rounded-md transition-colors ${isLogin ? 'bg-red-600 text-white shadow' : 'text-gray-300 hover:bg-gray-700'}`}>
            Sign In
          </button>
          <button onClick={() => setIsLogin(false)} className={`w-1/2 py-2.5 text-sm font-medium leading-5 rounded-md transition-colors ${!isLogin ? 'bg-red-600 text-white shadow' : 'text-gray-300 hover:bg-gray-700'}`}>
            Create Account
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
              <input type="text" value={formData.name} onChange={(e) => handleInputChange('name', e.target.value)} className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500" placeholder="Elon M." required={!isLogin} />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Email Address</label>
            <input type="email" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500" placeholder="you@habitat.mars" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Password</label>
            <input type="password" value={formData.password} onChange={(e) => handleInputChange('password', e.target.value)} className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500" placeholder="••••••••" required />
          </div>
          {error && <p className="text-sm text-red-400 text-center">{error}</p>}
          <button type="submit" disabled={loading} className="w-full bg-red-600 text-white py-2.5 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center">
            {loading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> : (isLogin ? <><ArrowRightOnRectangleIcon className="h-5 w-5 mr-2"/> Sign In</> : <><UserPlusIcon className="h-5 w-5 mr-2"/>Create Account</>)}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LandingPage;
