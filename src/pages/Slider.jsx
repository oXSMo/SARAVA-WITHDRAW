import React, { useEffect, useMemo, useState } from "react";
import Input from "../components/common/Input";
import { ArrowIcon, PhoneIcon } from "../icons/icons";
import PropTypes from "prop-types";

function Slider() {
  const [otp, setotp] = useState([...Array(6)].fill(""));

  const handleChange = (e, i) => {
    if (!isNaN(Number(e.target.value))) {
      setotp([
        ...otp.map((data, index) => (index === i ? e.target.value : data)),
      ]);
      if (e.target.value.length > 3 && e.target.nextSibling) {
        e.target.nextSibling.focus();
      }
    }
  };

  console.log(otp);

  return (
    <section className="h-screen grid place-content-center ">
      <div className="w-8/12 gap-4 flex flex-wrap mx-auto otp">
        {otp.map((data, i) => (
          <input
            key={`otp-${i}`}
            type="text"
            className="w-8 text-center outline-none focus:outline"
            value={data}
            maxLength={4}
            onChange={(e) => {
              handleChange(e, i);
            }}
          />
        ))}
      </div>
    </section>
  );
}

const Select = ({ options, value, onChnage }) => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {}, []);

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
            }}
            key={i}
            className="p-2 text-neutral-600  hover:bg-neutral-300"
          >
            {o}
          </div>
        ))
      : [[<div key={"not-found"}>No Matches Found</div>]];
  }, [options, search]);

  const val = useMemo(() => value, [value]);

  return (
    <article
      id="1"
      className="relative flex flex-col items-center justify-center"
    >
      <aside className="flex shadow-inner shadow-black/40 bg-white/40 w-56 items-center justify-between overflow-hidden px-4   gap-1 border border-neutral-500 rounded-md ">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-10/12 bg-transparent outline-none text-sm font-semibold py-2"
        />
        <div
          onClick={() => {
            setOpen(!open);
          }}
          className={`relative py-2 cursor-pointer bg-transparent duration-300 ${
            open && "rotate-180"
          }`}
        >
          <ArrowIcon />
        </div>
      </aside>

      <aside
        id="options"
        className={`absolute scrollnone top-10 overflow-auto border border-neutral-500 w-full rounded-md transition-all duration-300 ${
          !open ? "max-h-0 border-0" : "max-h-40 border"
        }`}
      >
        {opt}
      </aside>
    </article>
  );
};

Select.propTypes = {
  options: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
  onChnage: PropTypes.func.isRequired,
};
Select.DefaultsProps = {
  options: [],
  value: "",
  onChange: () => {},
};

export default Slider;
