// components/Layout.js
import React, { useState } from 'react';
import Sidebar from '../Shared/Sidebar/Sidebar';


export default function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // control the sidebar state

  return (
    <div className="flex">
      <Sidebar isSidebarOpen={isSidebarOpen} />
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {children}
      </div>
    </div>
  );
}
