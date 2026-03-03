import React from "react";

const Typography = ({ color, className, variant = "p", children }) => {
  const styles = {
    h1: { fontSize: "20px", fontweight: "bold" },
    p: { fontSize: "16px" },
    div: {},
    span: {},
    h5:{}
  };
  const colors = {
    default: "black",
    primary: "#DB4444",
    secondary: "#F5F5F5",
  };

  const allowed = Object.keys(styles);
  const Component = allowed.includes(variant) ? variant : "p";
  return (
    <>
      <Component
        style={{ ...styles[variant], color: colors[colors] }}
        className={className}
      >
        {children}
      </Component>
    </>
  );
};

export default Typography;
