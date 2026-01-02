import React from 'react'


const Button = ({ children, variant = "primary", ...props }) => {
    const base = "px-4 py-2 rounded text-sm font-medium transition";

    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        secondary: "bg-gray-200 text-gray-800 hover:bg-gray-900",
        danger: "bg-red-500 text-white hover-bg-red-600",
    };


    return (
        <button className={`${base} ${variants[variant]}`} {...props}>
            {children}
        </button >
    )
}

export default Button;