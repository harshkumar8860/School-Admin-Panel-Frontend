import React from 'react'
import { useSchool } from '../context/SchoolContext';
import { useNavigate } from 'react-router-dom';
import Button from './ui/Button';

const Navbar = () => {
  const { logout, currentUser } = useSchool();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className='h-16 bg-white border-b flex items-center justify-between px-6'>
      {/* <h1 className='text-lg font-semibold'>Admin Panel</h1> */}
      <h1 className='text-lg font-semibold'>Welcome, {currentUser.name || currentUser.role}</h1>
      <Button
        onClick={handleLogout}
        variant='danger'
        props='text-sm px-4 py-1 rounded hover:underline active:cursor-pointer'>
        Logout
      </Button>
    </header>
  )
}

export default Navbar;