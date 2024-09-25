import React, { act, useEffect, useMemo, useState } from "react";
import { ArrowIcon } from "../../icons/icons";

function Select({
  title,
  className,
  options,
  name,
  icon,
  direction = true,
  placeholder,
  setCredentials,
  credentials,
}) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setactive] = useState(options.includes(credentials[name]));

  useEffect(() => {
    if (search) {
      setCredentials({ ...credentials, [name]: search });
    }
    setactive(options.includes(search));
  }, [search]);

  const opt = useMemo(() => {
    const OPTIONS = options.filter(
      (o) =>
        o.toString().toLowerCase().indexOf(search.toString().toLowerCase()) !==
        -1
    );

    return OPTIONS.length > 0
      ? OPTIONS.map((o, i) => (
          <div
            onClick={() => {
              setOpen(false);
              setSearch(o);
            }}
            key={i}
            className={`p-2 text-neutral-600 rounded-xl cursor-pointer font-bold hover:bg-[#DCDFE5] ${
              o === search && "!text-secondary bg-[#d2d6dd]"
            }`}
          >
            {o}
          </div>
        ))
      : [[<></>]];
  }, [options, search]);

  return (
    <nav className="">
      <h1
        className={`text-sm = m-1 text-gray-500 font-bold ${
          credentials[name] && "text-secondary"
        }`}
      >
        {title}
      </h1>

      <article className="relative flex flex-col items-center justify-center">
        <aside
          className={`flex justify-between  items-center border-2 border-transparent px-3 rounded-[14px] text-gray-400 font-bold bg-[#EFEFEF] rtl ${
            active && "!border-secondary"
          } ${className}`}
        >
          <div
            className={`flex gap-3 items-center ${
              credentials[name] && "text-secondary"
            }`}
          >
            {icon}
            <div
              className={`w-0.5 h-6 rounded-full bg-gray-400 ${
                credentials[name] && "!bg-blue-500"
              }`}
            />
            <input
              type="text"
              placeholder={placeholder ? placeholder : ""}
              value={credentials[name]}
              onChange={(e) => {
                setSearch(e.target.value);
                setCredentials({ ...credentials, [name]: e.target.value });
              }}
              className="outline-none w-11/12 py-2 bg-transparent placeholder:text-sm placeholder:text-black/30"
            />
          </div>
          <div
            onClick={() => {
              setOpen(!open);
            }}
            className={`p-2  cursor-pointer ${direction && "hidden"}`}
          >
            <ArrowIcon
              className={`duration-300 ${open && "rotate-180"} ${
                credentials[name] && "text-secondary"
              }`}
            />
          </div>
        </aside>

        <aside
          id="options"
          className={`absolute mb-4 scrollnone z-10 top-[50px] overflow-auto bg-[#F6F4F4]   w-full rounded-2xl transition-all duration-300 ${
            !open ? "max-h-0 border-0" : "max-h-44 border p-3"
          }`}
        >
          {opt}
        </aside>
      </article>
    </nav>
  );
}

export default Select;
