import React from 'react'


const Button = ({ children, variant = "primary", ...props }) => {
    const base = "px-4 py-2 rounded text-sm font-medium transition hover:cursor-pointer";

    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-800",
        secondary: "bg-gray-200 text-gray-800 hover:bg-gray-400",
        danger: "bg-red-500 text-white hover:bg-red-700",
    };


    return (
        <button className={`${base} ${variants[variant]}`} {...props}>
            {children}
        </button >
    )
}

export default Button;