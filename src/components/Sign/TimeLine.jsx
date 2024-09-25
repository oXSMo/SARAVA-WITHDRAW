import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { openSlice } from "../../store/useStore";

function TimeLine() {
  const { pathname } = useLocation();
  const path = Number(pathname[pathname.length - 1]);
  const navigate = useNavigate();
  const { nav } = openSlice();

  return (
    <nav
      className={`sm:h-full h-[calc(100%-64px)] md:w-[380px] w-[320px] md:static absolute  left-0 duration-300 md:translate-x-0  overflow-auto scrollnone  bg-white px-4 pt-6 ${
        !nav && "-translate-x-[100%] "
      }`}
    >
      {[
        {
          title: "اطلاعات حساب سرمایه گذاری",
          description: "اطلاعات حساب کاربری خود را جهت پیگیری حساب وارد کنید",
        },
        {
          title: "ورود اطلاعات شخصی",
          description: "اطلاعات لازم را برای تکمیل پروفایل وارد کنید",
        },
        {
          title: "نمایش موجودی",
          description:
            "در این بخش می‌توانید مقدار موجودی کیف پول، مقدار دیرکرد محاسبه شده و مقدار قابل برداشت خود را مشاهده کنید.",
        },
        {
          title: "شماره کارت",
          description: "برای انجام برداشت، لطفاً شماره کارت خود را وارد کنید.",
        },
        {
          title: "تایید اطلاعات",
          description:
            "با تایید اطلاعات و دریافت کد پیگیری مراحل تکمیل حساب خود را انجام دهید",
        },
      ].map((e, i) => (
        <div
          key={`timeLine-${i}`}
          onClick={() => {}}
          className={`mb-2 `}
        >
          <article className="flex gap-2 items-center mb-1.5">
            <div
              className={`w-8 h-8 circle duration-700  ${
                i + 1 > path && "!text-black/20 !border-black/20 "
              } ${i + 1 == path && "scale-110"}`}
            >
              <p>{i + 1}</p>
            </div>
            <h1
              className={`text-base font-semibold translate-y-0.5 duration-700 ${
                i + 1 > path && "!text-black/20"
              } ${i + 1 == path && "!text-[17px] !translate-y-0"}`}
            >
              {e.title}
            </h1>
          </article>

          <article className="flex gap-3 mb-2">
            <div
              className={`w-0.5 bg-blue-500 mx-[15px] rounded-full duration-700 ${
                i + 2 > path && "!bg-black/20"
              } ${i === 4 && "opacity-0"}`}
            />
            <h2
              className={`text-[13px] text-black/50 font-bold mb-2 duration-700 ${
                i + 1 > path && "!text-black/30 !border-black/30"
              }`}
            >
              {e.description}{" "}
            </h2>
          </article>
        </div>
      ))}
      <article className="mt-6 mb-4 px-1 ">
        <h1 className="font-bold text-gray-800">
          نیاز به کمک دارید؟
        </h1>
        <h2 className="text-[12px] px-1 mb-2 text-gray-600">
          اگر سوال یا نگرانی‌ای دارید، تیم پشتیبانی ما در خدمت شماست.
        </h2>
        <a target="_blank" href="https://t.me/avasup" className="px-3 py-1 !my-1.5 border-blue-600 duration-200 text-secondary border-2 font-bold text-sm mb-1 rounded-xl">
          تماس با ما
        </a>
      </article>
    </nav>
  );
}

export default TimeLine;
