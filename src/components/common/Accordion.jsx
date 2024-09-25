import { motion } from "framer-motion";
import React, { useState } from "react";
import { fadeIn, titleMotion } from "../../utils/framerVars";

function Accordion() {
  const [list, setList] = useState(0);
  const [active, setActive] = useState(1);
  console.log(active);

  return (
    <section className="w-full relative min-h-96 rtl grid md:px-12 px-4 mb-24">
      <motion.div {...titleMotion} className="grid">
        <h1 className="text-3xl md:text-start z-10 text-center font-bold !text-[#ff950b]  mb-4">
          پاسخ به سوالات شایع
        </h1>
        <h2 className="text-[18px] md:text-start z-10 text-center mb-8  md:font-semibold">
          راهنمایی کامل برای اطلاعات واضح و سریع
        </h2>
      </motion.div>

      <motion.article
        {...fadeIn("", "", 1, 3)}
        className="flex md:flex-row flex-col gap-4 rtl z-10"
      >
        <aside className="md:w-64  ">
          <h1 className="text-3xl  font-bold mb-5">فهرست مطالب</h1>
          <div className="md:block md:px-4 flex justify-between w-full md:gap-4 gap-2">
            {[
              "ساخت حساب و ثبت نام",
              "واریز و برداشت",
              "سرمایه گذاری",
              "امنیت و حریم خصوصی",
            ].map((e, i) => (
              <h2
              key={e}
                onClick={() => setList(i)}
                className={`my-3 md:text-[15px] md:w-40 w-20  overflow-hidden overflow-ellipsis whitespace-nowrap tracking-tight text-[13px]  cursor-pointer duration-300  ${
                  list === i && "text-secondary scale-105 font-bold"
                }`}
              >
                {e}
              </h2>
            ))}
          </div>
        </aside>

        <aside className="w-full flex-1 w1/">
          {[
            [
              {
                title: "چگونه می‌توانم حساب کاربری در سایت سرآوا ایجاد کنم؟",
                text: "",
              },
              {
                title: "آیا روند ثبت نام و ساخت حساب کاربری شما رایگان است؟",
                text: "بله، روند ثبت نام و ساخت حساب کاربری در سرویس ما کاملاً رایگان است. شما می‌توانید بدون هیچ هزینه‌ای حساب کاربری خود را ایجاد کنید و از تمامی امکانات و خدمات ما بهره‌مند شوید. ما هیچ مبلغی بابت ثبت نام یا ایجاد حساب کاربری از شما دریافت نمی‌کنیم.",
              },
              {
                title:
                  "آیا می‌توانم از یک ایمیل برای دسترسی به چند حساب کاربری در سرآوا استفاده کنم؟",
                text: "",
              },
              {
                title:
                  "آیا نیاز به تأیید ایمیل یا شماره تلفن برای ساخت حساب کاربری دارم؟",
                text: "",
              },
              {
                title: "آیا اطلاعات حساب کاربری من محفوظ و امن است؟",
                text: "",
              },
            ],
            [
              { title: "", text: "" },
              { title: "", text: "" },
              { title: "", text: "" },
              { title: "", text: "" },
              { title: "", text: "" },
            ],
            [
              { title: "", text: "" },
              { title: "", text: "" },
              { title: "", text: "" },
              { title: "", text: "" },
              { title: "", text: "" },
            ],
            [
              { title: "", text: "" },
              { title: "", text: "" },
              { title: "", text: "" },
              { title: "", text: "" },
              { title: "", text: "" },
            ],
          ].map(
            (e, i) =>
              list === i &&
              e.map((x, y) => (
                <AccordionTab
                  {...x}
                  i={y}
                  set={setActive}
                  active={y === active}
                />
              ))
          )}
        </aside>
      </motion.article>
      <img
        src="/assets/bg2.png"
        className="md:block  absolute z-0 pointer-events-none translate-y-48 md:right-0 left-0 md:scale-100 scale-[-1] w-80 opacity-75"
      />
    </section>
  );
}

export default Accordion;

const AccordionTab = ({ title, text, i, set, active }) => {
  if (title)
    return (
      <article
        onClick={() => {
          set(i);
        }}
        className="w-full  cursor-pointer px-6 rounded-3xl duration-500 fade mb-4"
      >
        <aside className="flex gap-4 items-center h-10 text-black font-semibold ">
          <PlusToMines active={active} />
          <h1>{title}</h1>
        </aside>
        <div
          className={`grid overflow-hidden transition-all duration-700 ${
            active ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <h1 className="overflow-hidden mb-2 text-[#747474] w-11/12">
            {text}
          </h1>
        </div>
        <div className="w-[95%] bg-gray-500 h-0.5 opacity-65" />
      </article>
    );
};

const PlusToMines = ({ active = false, className = "" }) => (
  <article className={`cursor-pointer w-4 h-4 relative`}>
    <span
      className={`w-4 h-[3px] absolute top-1/2 pointer-events-none -translate-y-1/2 duration-1000 bg-secondary rotate-90 ${
        active && "!rotate-[180deg]"
      }`}
    />
    <span
      className={`w-4 h-[3px] absolute top-1/2 pointer-events-none -translate-y-1/2 duration-1000 ease-in-out bg-secondary rotate-0 ${
        active && "rotate-[-180deg]"
      }`}
    />
  </article>
);
