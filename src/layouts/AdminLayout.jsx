import React from 'react'
import Navbar from "../components/Navbar";
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className='flex h-screen bg-gray-100'>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <div className='flex flex-col flex-1'>

        {/* Navbar */}
        <Navbar />

        {/* Content */}
        <main className='flex-1 overflow-y-auto p-6'>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout;