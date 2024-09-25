import React from "react";
import { Link } from "react-router-dom";

function Button({
  button = "button",
  className,
  onClick,
  children,
  disabled = false,
  link,
}) {
  if (link)
    return (
      <Link
        to={link}
        className={`bg-[linear-gradient(90deg,#88AAF8,#386FF9)] relative rounded-2xl py-2.5 px-8 text-white text-lg font-semibold tracking-wide duration-200 hover:scale-105 ${className}`}
      >
        {children}
        <img
          src="https://i.ibb.co/PWLRXXF/image.png"
          className="w-full h-full absolute object-cover opacity-15 "
        />
      </Link>
    );
  else
    return (
      <button
        onClick={() => {
          onClick();
        }}
        disabled={disabled}
        type={button}
        className={`bg-[linear-gradient(90deg,#88AAF8,#386FF9)]  relative overflow-hidden rounded-2xl py-2.5 px-8 text-white text-lg font-semibold tracking-wide duration-200 hover:scale-105 ${
          disabled && "cursor-not-allowed bg-[#535353] !bg-[linear-gradient(90deg,#949494,#535353)] "
        } ${className}`}
      >
        <img
          src="https://i.ibb.co/PWLRXXF/image.png"
          className="w-full z-0 h-full absolute object-cover opacity-15 top-0 left-0"
        />
        {children}
      </button>
    );
}

export default Button;
