import React, { useState, useEffect } from 'react';
import Manifest from '@mnfst/sdk';
import LandingPage from './screens/LandingPage';
import DashboardPage from './screens/DashboardPage';
import config from './constants.js';
import './index.css';

function App() {
  const [user, setUser] = useState(null);
  const [currentScreen, setCurrentScreen] = useState('landing');
  const [loading, setLoading] = useState(true);
  const [backendStatus, setBackendStatus] = useState(false);
  const manifest = new Manifest(config.BACKEND_URL);

  const checkBackendHealth = () => {
    fetch('/api/health')
      .then(response => setBackendStatus(response.ok))
      .catch(() => setBackendStatus(false));
  };

  useEffect(() => {
    checkBackendHealth();
    const intervalId = setInterval(checkBackendHealth, 30000); // Check every 30 seconds

    manifest.from('user').me()
      .then(userData => {
        if (userData) {
          setUser(userData);
          setCurrentScreen('dashboard');
        }
      })
      .catch(() => {
        setUser(null);
        setCurrentScreen('landing');
      })
      .finally(() => setLoading(false));

    return () => clearInterval(intervalId);
  }, []);

  const login = async (email, password) => {
    await manifest.login(email, password);
    const loggedInUser = await manifest.from('user').me();
    setUser(loggedInUser);
    setCurrentScreen('dashboard');
  };

  const signup = async (email, password, name) => {
    await manifest.from('user').signup({ email, password, name, role: 'customer' });
    // Auto-login after successful signup
    await manifest.login(email, password);
    const signedUpUser = await manifest.from('user').me();
    setUser(signedUpUser);
    setCurrentScreen('dashboard');
  };

  const logout = async () => {
    await manifest.logout();
    setUser(null);
    setCurrentScreen('landing');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
          <p className="mt-4 text-gray-300">Connecting to Mars Colony Network...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {currentScreen === 'landing' ? (
        <LandingPage onLogin={login} onSignup={signup} />
      ) : (
        <DashboardPage user={user} onLogout={logout} manifest={manifest} backendStatus={backendStatus} />
      )}
    </div>
  );
}

export default App;
