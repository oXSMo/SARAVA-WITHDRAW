import React from 'react'
import { openSlice } from '../../store/useStore';

function Nav() {

  const {nav,setNav} = openSlice()

  return (
    <nav className='w-full flex items-center justify-between  px-16 shadow-lg shadow-black/20 relative z-10 bg-[#F6F4F4] h-16'>
      <BurgerMenu selected={nav} setSelected={setNav} className="sm:hidden block" />
      <img src="https://i.ibb.co/SfnGcQp/image2.png" className='h-10' />
      <img src="https://i.ibb.co/6PqXScv/image1.png" className='sm:block hidden h-12' />
    </nav>
  )
}


export const BurgerMenu = ({
  color = "bg-[#292D32]",
  selected,
  setSelected,
  className,
}) => {
  return (
    <article
      onClick={() => setSelected(!selected)}
      className={`h-[20px] w-[19px]  relative  scale-125 cursor-pointer ${className}`}
    >
      <span className="w-full h-full peer absolute  " />
      <div
        className={`absolute w-[8.5px] h-[11px] ${color} rounded-sm right-0 top-0  duration-500 ${
          selected && "!top-[45%]"
        }`}
      />
      <div
        className={`absolute w-[8.5px] h-[7px] ${color} rounded-sm right-0 bottom-0 duration-500 ${
          selected && "!right-[53%]"
        }`}
      />
      <div
        className={`absolute w-[8.5px] h-[11px] ${color} rounded-sm left-0 bottom-0 duration-500 ${
          selected && "!bottom-[45%]"
        }`}
      />
      <div
        className={`absolute w-[8.5px] h-[7px] ${color} rounded-sm left-0 top-0 duration-500 ${
          selected && "!left-[53%]"
        }`}
      />
    </article>
  );
};

export default Nav
