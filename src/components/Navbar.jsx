import React from 'react'
import { useSchool } from '../context/SchoolContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { logout } = useSchool();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className='h-16 bg-white border-b flex items-center justify-between px-6'>
      <h1 className='text-lg font-semibold'>Admin Panel</h1>
      <button
        onClick={handleLogout}
        className='text-sm px-4 py-1 rounded hover:underline active:cursor-pointer'>
        Logout
      </button>
    </header>
  )
}

export default Navbar;