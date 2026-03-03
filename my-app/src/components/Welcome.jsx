import React from "react";
import { Link } from "react-router-dom";
import Typography from "./common/Typography";

const Welcome = () => {
  return (
    <header className="head">
      <Typography variant="h1" className="head-heading">
        Welcome to
        <Typography
          variant="span"
          className="head-app"
          title="MyApp"
        ></Typography>
      </Typography>
      <Typography variant="p" className="head-text">
        Build, Learn, and Grow with our platform. Create your account today and
        explore the possibilities.
      </Typography>
      <div className="head-btn">
        <Link to="/signup" className="head-left">
          Get Started
        </Link>
        <Link to="/about" className="head-right">
          Learn More
        </Link>
      </div>
    </header>
  );
};

export default Welcome;
