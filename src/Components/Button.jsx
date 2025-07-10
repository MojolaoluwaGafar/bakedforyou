import React from 'react'

export default function Button({content, onClick, className,type, disabled , isLoading }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-3 rounded-md transition duration-300 ${className}`}
      disabled={disabled || isLoading}
    >
      {isLoading ? 
        <span className="button__spinner" aria-hidden="true"></span> : 
        content }
    </button>
  );
}
