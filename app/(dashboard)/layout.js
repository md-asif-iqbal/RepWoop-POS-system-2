'use client';

import { useRouter } from 'next/navigation';

import { useEffect } from 'react';

import Sidebar from './Shared/Sidebar/Sidebar';
import Navigation from './Shared/Navigation/Navigation';
import { useUser } from './context/UserContext';
import LoginForm from '../Login/page';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function RootLayout({ children }) {
  const { isLoggedIn } = useUser();
  const router = useRouter();

  // useEffect(() => {
  //   // Redirect to login if not logged in
  //   if (!isLoggedIn) {
  //     router.push('/');
  //   }
  // }, [isLoggedIn, router]);

  // If not logged in, show only the login page
  if (!isLoggedIn) {
    return <LoginForm />;
  }

  return (
    <html lang="en">
      <body className="font">
        <div className="h-screen flex">
          {/* LEFT Sidebar */}
          <div className="hidden lg:block md:w-[8%] lg:w-[16%] xl:w-[14%] p-0 bg-[#F7F8FA] dark:bg-[#141432]">
            <Sidebar />
          </div>

          {/* RIGHT Main Content */}
          <div className="w-[100%] md:w-[95%] lg:w-[84%] xl:w-[92%] bg-[#F7F8FA] dark:bg-[#141432] overflow-scroll flex flex-col">
            <Navigation />
            {children}
            <footer />
          </div>
          <ToastContainer />
        </div>
      </body>
    </html>
  );
}
