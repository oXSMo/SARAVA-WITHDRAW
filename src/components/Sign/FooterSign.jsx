import React from "react";
import { Icon24, QuestionMarkIcon } from "../../icons/icons";

function FooterSign() {

  

  return (
    <section className="w-full h-20 flex px-3 items-center  justify-between sm:hidden bg-[#FFFFFF]">
      <div className=" w-8/12">
        <Icon24 />
        <h1 className="text-[17px]">نیاز به کمک دارید؟</h1>
        <h2 className="text-[8px] text-black/50">
          اگر سوال یا نگرانی‌ای دارید، تیم پشتیبانی ما در خدمت شماست.
        </h2>
      </div>
      <a target="_blank" href="https://t.me/avasup" className="px-1 text-secondary text-[10px] font-black items-center rounded-[12px] hover:scale-105 duration-300 border-4 border-secondary flex justify-center gap-1 py-1.5">
        <QuestionMarkIcon />
        تماس با پشتیبانی
      </a>
    </section>
  );
}

export default FooterSign;
