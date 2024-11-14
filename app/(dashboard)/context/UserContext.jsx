'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Loader from '@/app/Loaders/page';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // User state to hold all information
  const [loading, setLoading] = useState(true); // Loading state
  const router = useRouter();

  useEffect(() => {
    const checkLoginStatus = () => {
      setLoading(true); // Start loading
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      const expiration = localStorage.getItem('expiration');
      const storedUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
      const currentTime = new Date().getTime();

      if (loggedIn && expiration && currentTime < parseInt(expiration)) {
        setIsLoggedIn(true);
        setUser(storedUser); // Set user from localStorage
        startLogoutTimer();
      } else {
        logout();
        router.push('/');
      }

      setLoading(false); // End loading
    };

    checkLoginStatus();

    const handleStorageChange = (event) => {
      if (event.key === 'isLoggedIn' || event.key === 'expiration' || event.key === 'user') {
        checkLoginStatus();
      }
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const login = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    localStorage.setItem('isLoggedIn', 'true');
    router.push('/home');
    localStorage.setItem('user', JSON.stringify(userData)); // Store user data in localStorage
    const expiration = new Date().getTime() + 15 * 60 * 60 * 1000;
    localStorage.setItem('expiration', expiration.toString());
    startLogoutTimer();
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('expiration');
    localStorage.removeItem('user');
    router.push('/');
  };

  const startLogoutTimer = () => {
    const expiration = localStorage.getItem('expiration');
    const currentTime = new Date().getTime();
    const remainingTime = parseInt(expiration) - currentTime;

    setTimeout(logout, remainingTime);
  };

  if (loading) {
    return (
      <Loader/>
    );
  }

  return (
    <UserContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
