import React from "react";

const Typography = ({ variant, children, title, className }) => {
  const styles = {
    h1: { fontSize: "30px", fontWeight: "" },
    span: { color: "#00ced1" },
    p: {},
  };

  

  return (
    <>
      <Tag className={className} style={styles[variant]}>
        {children}
        {title}
      </Tag>
    </>
  );
};

export default Typography;
