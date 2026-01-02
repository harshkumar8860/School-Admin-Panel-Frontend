import React from 'react'

const Navbar = () => {
  return (
    <header className='h-16 bg-white border-b flex items-center justify-between px-6'>
      <h1 className='text-lg font-semibold'>Admin Panel</h1>
      <button className='text-sm bg-red text-red px-4 py-1 rounded hover:underline active:cursor-pointer'>
        Logout
      </button>
    </header>
  )
}

export default Navbar;