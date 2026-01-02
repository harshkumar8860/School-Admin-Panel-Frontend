import React from 'react'

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;


    return (
        <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-50'>
            <div className='bg-white rounded-lg w-full max-w-md p-6'>

                {/* Header */}
                <div className='flex justify-between items-center mb-4'>
                    <h2 className='text-lg font-semibold'>{title}</h2>
                    <button onClick={onClose} className='text-gray-500'>X</button>
                </div>
                {/* Body */}
                {children}
            </div>
        </div>
    )
}

export default Modal;