import React, { useEffect } from "react";
import Button from "./common/Button";
import { Swiper, SwiperSlide, useSwiper, useSwiperSlide } from "swiper/react";
import { animate, motion } from "framer-motion";
import { fadeIn, titleMotion } from "../utils/framerVars";

function Cards() {
  return (
    <>
      <motion.section
        {...fadeIn("", "", 0.5, 2.5)}
        className="md:hidden block place-self-center w-screen !overflow-y-visible  h-[500px] mb-24 py-5"
      >
        <Swiper
          slidesPerView={"auto"}
          centeredSlides={true}
          spaceBetween={0}
          loop={true}
          pagination={{
            clickable: true,
          }}
          className="mySwiper"
        >
          {[
            {
              icon: "icon7.png",
              grade: "پایه",
              desc: "بیشتر اشنا شیم!",
              profite: 15,
              upgrade: false,
              time: 13,
              renew: false,
            },
            {
              icon: "icon8.png",
              grade: "برنزی",
              desc: "مناسب سرمایه های کم",
              profite: 25,
              time: 30,
            },
            {
              icon: "icon9.png",
              grade: "نقره ای",
              desc: "مناسب سرمایه های کم",
              profite: 70,
              time: 60,
            },
            {
              icon: "icon11.png",
              grade: "طلایی",
              desc: "مناسب سرمایه های کم",
              profite: 135,
              time: 90,
            },
            {
              icon: "icon10.png",
              grade: "الماسی",
              desc: "گل سر سبد سرآوا",
              profite: 390,
              time: 180,
            },
          ].map((e) => (
            <SwiperSlide className="!w-[300px] !h-[500px] !grid   rounded-3xl py-12" key={e.grade}>
              <UpgradeCard {...e} />
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.section>
      <motion.section
        {...titleMotion}
        className=" md:flex hidden gap-4 rtl flex-wrap justify-center mb-24"
      >
        <article className="h-[520px] w-[180px] overflow-hidden relative -translate-x-4 translate-y-0.5">
          <div className=" mt-[148px] w-full h-full">
            <aside className="hover:-translate-x-4 duration-200 h-16 bg-[#C9DCE7] rounded-r-xl items-center text-sm justify-start px-4 font-semibold flex gap-4">
              <img src="/assets/card/icon1.svg" className="w-6 h-6" />
              نرخ سود
            </aside>

            <aside className="hover:-translate-x-4 duration-200 cursor-pointer h-16  rounded-r-xl items-center text-sm justify-start px-4 font-semibold flex gap-4">
              <img src="/assets/card/icon2.svg" className="w-6 h-6" />
              ارتقای پکیج
              <img src="/assets/card/icon3.svg" className="w-4 h-4" />
            </aside>

            <aside className="hover:-translate-x-4 duration-200 cursor-pointer h-16 bg-[#C9DCE7] rounded-r-xl items-center text-sm justify-start px-4 font-semibold flex gap-4">
              <img src="/assets/card/icon4.svg" className="w-6 h-6" />
              مدت زمان قفل
            </aside>

            <aside className="hover:-translate-x-4 duration-200 cursor-pointer h-16  rounded-r-xl items-center text-sm justify-start px-4 font-semibold flex gap-4">
              <img src="/assets/card/icon5.svg" className="w-6 h-6" />
              فعالسازی مجدد
            </aside>

            <aside className="hover:-translate-x-4 duration-200 cursor-pointer h-16 bg-[#C9DCE7] rounded-r-xl items-center text-sm justify-start px-4 font-semibold flex gap-4">
              <img src="/assets/card/icon6.svg" className="w-6 h-6" />
              حجم سرمایه
            </aside>
          </div>
        </article>
        {[
          {
            icon: "icon7.png",
            grade: "پایه",
            desc: "بیشتر اشنا شیم!",
            profite: 15,
            upgrade: false,
            time: 13,
            renew: false,
          },
          {
            icon: "icon8.png",
            grade: "برنزی",
            desc: "مناسب سرمایه های کم",
            profite: 25,
            time: 30,
          },
          {
            icon: "icon9.png",
            grade: "نقره ای",
            desc: "مناسب سرمایه های کم",
            profite: 70,
            time: 60,
          },
          {
            icon: "icon11.png",
            grade: "طلایی",
            desc: "مناسب سرمایه های کم",
            profite: 135,
            selected: true,
            time: 90,
          },
          {
            icon: "icon10.png",
            grade: "الماسی",
            desc: "گل سر سبد سرآوا",
            profite: 390,
            time: 180,
          },
        ].map((e, i) => (
          <Card {...e} i={i} key={`CARD-${i}`}/>
        ))}
      </motion.section>
    </>
  );
}

const Card = ({
  icon,
  selected = false,
  grade,
  desc,
  profite,
  upgrade = true,
  time,
  renew = true,
  i,
  price = "1ز 10$ تا 100$",
}) => (
  <>
    {/* DESKTOP CARD */}
    <motion.article
      {...fadeIn("right", "", i * 0.4, 0.7)}
      whileHover={{ scale: 1.05 }}
      className={`relative   cursor-pointer !hover:scale-105 duration-200  h-[520px] w-[170px]   bg-opacity-20 rounded-3xl  border-solid ${
        selected
          ? " ring-secondary ring-4 hover:ring-[6px]"
          : "border-[2px] border-gray-400 bg-[#E6E9ED]"
      } `}
    >
      {selected && (
        <span className="absolute rounded-3xl w-full h-full bg-secondary pointer-events-none opacity-30" />
      )}
      <img
        src={`/assets/${icon}`}
        className="absolute -top-5 left-1 w-14 h-14 "
      />

      <aside className="h-[148px] grid p-4">
        <h1 className="text-2xl justify-self-center font-bold">{grade}</h1>
        <Button className="flex gap-2 h-9 !px-0 items-center justify-center rounded-xl">
          <img src="/assets/icon12.png" className="w-4 h-4" />
          <h2 className="text-sm text-nowrap">سرمایه گذاری</h2>
        </Button>
        <h3 className="text-sm justify-self-center text-gray-500">{desc}</h3>
      </aside>

      <aside className="grid h-16 bg-[#D9E6EF] place-content-center text-[#16C20A] font-bold">
        %{profite} درصد
      </aside>

      <aside className="grid h-16  place-content-center font-bold">
        {upgrade ? <Check check={upgrade} /> : "-"}
      </aside>

      <aside className="grid h-16  bg-[#D9E6EF] tracking-wide place-content-center font-semibold">
        {time} روز
      </aside>

      <aside className="grid h-16  tracking-wide place-content-center font-semibold">
        <Check check={renew} />
      </aside>

      <aside className="grid h-16  bg-[#D9E6EF] tracking-wide place-content-center font-semibold">
        {price}
      </aside>
    </motion.article>
    {/* PHONE CARD */}
  </>
);

export const Check = ({ check }) => (
  <span
    className={`w-6 h-6  grid place-content-center text-center rounded-full  ${
      check
        ? "bg-secondary text-white text-xs translate-x-1"
        : "text-black text-lg"
    }`}
  >
    <p className="mt-[2px]  ">{check ? "✓" : "-"}</p>
  </span>
);

const UpgradeCard = ({
  icon,
  grade,
  desc,
  profite,
  upgrade = true,
  time,
  renew = true,
  price = "1ز 10$ تا 100$",
}) => {
  const { isActive } = useSwiperSlide();
  return (
    <article
      className={`pointer-events-none bg-[#F6F4F4] rounded-3xl h-96 w-[270px] justify-self-center duration-500 relative p-4 ${
        isActive && "scale-[1.15]"
      }`}
    >
      <img
        src={`/assets/${icon}`}
        className="w-14 h-14 absolute -top-5  left-4"
      />
      <aside className="flex flex-col h-28 justify-between items-center w-full mb-6">
        <h1 className="text-2xl justify-self-center font-bold">{grade}</h1>
        <Button className="flex gap-4 w-3/4 h-10 rtl !px-0 pointer-events-auto items-center  justify-center rounded-xl">
          <img src={`/assets/icon12.png`} className="w-4 h-4" />
          <h2 className="text-sm text-nowrap">سرمایه گذاری</h2>
        </Button>
        <h3 className="text-sm justify-self-center text-gray-500">{desc}</h3>
      </aside>

      <aside className="w-full h-[55%] flex flex-col justify-between rtl">
        <div className="flex w-full justify-between">
          <h3 className="text-[15px] text-gray-500">نرخ سود</h3>
          <h1 className="text-[#2BC02F] font-bold">%{profite} درصد</h1>
        </div>

        <div className="flex w-full justify-between">
          <h3 className="text-[15px] text-gray-500">ارتقای پکیج</h3>
          <Check check={upgrade} />
        </div>

        <div className="flex w-full justify-between">
          <h3 className="text-[15px] text-gray-500">مدت زمان</h3>
          <h1 className="font-bold">{time} روز</h1>
        </div>

        <div className="flex w-full justify-between">
          <h3 className="text-[15px] text-gray-500">فعالسازی مجدد</h3>
          <Check check={renew} />
        </div>

        <div className="flex w-full justify-between">
          <h3 className="text-[15px] text-gray-500">حجم</h3>
          <h1 className="font-bold">{price}</h1>
        </div>
      </aside>
    </article>
  );
};

export default Cards;
