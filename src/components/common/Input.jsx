import React, { useEffect } from "react";
import { ExclamationMark, PhoneIcon } from "../../icons/icons";

function Input({
  lang,
  className,
  placeholder,
  name,
  setState,
  title,
  icon,
  type = "text",
  classPrefix,
  value,
  maxLength,
  limit,
  message,
  success,
}) {
  useEffect(() => {
    if (limit) {
      value > limit[1] ? setState((x) => ({ ...x, [name]: limit[1] })) : "";
      value < limit[0] && setState(limit[0]);
    }
  }, [value]);

  const handleChange = (e) => {
    if (type === "number") {
      !isNaN(Number(e.target.value)) &&
        setState({ ...value, [name]: e.target.value });
    }

    if (lang) {
      /^[^a-zA-Z0-9]*$/.test(e.target.value) &&
        setState({ ...value, [name]: e.target.value });
    }
  };

  return (
    <nav className="rtl">
      <h1
        className={`text-sm = m-1 text-gray-500 font-bold ${
          success === 1 ? "text-red-500 " : success === 2 && "text-secondary"
        }`}
      >
        {title}
      </h1>
      <article
        className={`flex gap-2.5  items-center border-2 border-transparent px-3 rounded-[14px] text-gray-400 font-bold bg-[#EFEFEF] rtl ${
          success === 1
            ? "text-red-500 !border-red-500"
            : success === 2 && "text-secondary !border-secondary"
        } ${className}`}
      >
        {icon}
        <div
          className={`w-0.5 h-6 rounded-full bg-gray-400 ${
            success === 1 ? "!bg-red-500" : success === 2 && "!bg-blue-500"
          }`}
        />
        <input
          id={name}
          autoComplete="off"
          inputMode={type === "number" ? "numeric" : "text"}
          type="text"
          className={`py-2.5 rtl  bg-transparent outline-none text-sm w-full placeholder:text-black/20 ${classPrefix}`}
          placeholder={placeholder}
          value={value[name]}
          maxLength={maxLength ? maxLength : 9999999}
          onChange={handleChange}
        />
      </article>
      {message && (
        <h2
          className={`text-gray-500 text-[10px] m-1 font-bold tracking-wide flex items-center gap-0.5 ${
            success === 1 ? "!text-red-500" : success === 2 && "text-secondary"
          }`}
        >
          <ExclamationMark className={"-translate-y-0.5"} /> {message}
        </h2>
      )}
    </nav>
  );
}

export default Input;
