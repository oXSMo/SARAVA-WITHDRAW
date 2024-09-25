import React from "react";

function Loader({className}) {
  return (
    <svg className={`loader ${className}`} viewBox="25 25 50 50">
      <circle className="loader" cx="50" cy="50" r="20"></circle>
    </svg>
  );
}

export default Loader;
