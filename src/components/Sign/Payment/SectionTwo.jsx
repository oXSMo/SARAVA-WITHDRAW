import React from "react";

function SectionTwo() {
  return (
    <section className="sm:w-9/12 sm:mx-auto mx-4">
      <h1 className="text-[15px] font-black mb-2">درحال پردازش توسط سیستم: </h1>
      <nav className="sm:w-9/12 w-full mx-auto">
        <h2 className=" my-1 text-[17px] mb-10 text-start w-full mx-auto text-gray-700">
          لطفا تا اتمام پردازش توسط سیستم منتظر بمانید و از پیام دادن به
          پشتیبانی بپرهیزید پردازش پرداخت شما به صورت اتوماتیک توسط سیستم تایید
          میشود{" "}
        </h2>
      </nav>
    </section>
  );
}



export default SectionTwo;
