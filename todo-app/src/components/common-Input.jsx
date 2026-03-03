import React, { useRef } from "react";
import { forwardRef } from "react";

const Input = forwardRef((props, ref) => {
  return <input {...props} className="" ref={ref} />;
});

export default Input;
