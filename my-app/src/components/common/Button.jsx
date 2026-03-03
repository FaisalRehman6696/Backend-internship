import React from "react";

const Button = ({ title, onClick, onSubmit, className }) => {
  return (
    <button className={className} onClick={onClick} onSubmit={onSubmit}>
      {title}
    </button>
  );
};

export default Button;
