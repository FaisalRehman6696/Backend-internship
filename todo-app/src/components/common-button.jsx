import React from "react";

const Button = ( { onClick , disabled , title}) => {
  return <button disabled={disabled} onClick={onClick} >{title}</button>;
};

export default Button;