import React from "react";

const Input = ({ className, placeholder, required }) => {
  return (
    <input
      placeholder={placeholder}
      required={required}
      className={`"w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none ${className}`}
    />
  );
};

export default Input;
