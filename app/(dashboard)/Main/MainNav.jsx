'use client'
import React, { useState } from 'react';
import Navigation from '../Shared/Navigation/Navigation';
import Sidebar from '../Shared/Sidebar/Sidebar';
export default function MainNav() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Function to toggle the sidebar open state
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
  return (
    <div>
         <div className="font-nunito text-sm">
            {/* Pass toggleSidebar function to Navbar */}
            <Navigation toggleSidebar={toggleSidebar} />
            
            <div className="">
                {/* Pass isSidebarOpen state to Sidebar */}
                <Sidebar isSidebarOpen={isSidebarOpen} />
                
            </div>
        </div>
    </div>
  )
}
