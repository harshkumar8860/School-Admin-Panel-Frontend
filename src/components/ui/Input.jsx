import React from 'react'

const Input = ({ label, ...props }) => {
    return (
        <div className='flex flex-col gap-1'>
            {label && <label className='text-sm font-medium'>{label}</label>}
            <input className='border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                {...props}
            />
        </div>
    )
}

export default Input;