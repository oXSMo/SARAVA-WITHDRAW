import React, { useEffect, useState } from "react";
import { SuccessIcon } from "../../../icons/icons";
import { useConfig } from "../../hooks/useSign";
import { userInfoSlice } from "../../../store/useStore";
import Loader from "../../common/Loader";

function SectionThree() {
  const { err, loading, data } = useConfig();
  const { info } = userInfoSlice();

  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = Date.now();
      const remainingTime = data.MilliUnix - now;

      if (remainingTime <= 0) {
        clearInterval(intervalId);
        return;
      }

      const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

      setDays(days);
      setHours(hours);
      setMinutes(minutes);
      setSeconds(seconds);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [data.MilliUnix]);

  return (
    <section className="md:w-9/12 md:mx-auto pr- mx-4">
      <h1 className="text-[15px] font-black mb-2">تایید نهایی: </h1>{" "}
      <nav className="md:w-10/12 w-full flex gap-3">
        <SuccessIcon />
        <div>
          <h1 className="text-green-500 font-semibold tracking-wider  mb-1.5">
            درخواست شما با موفقیت تایید شد
          </h1>
          <h2 className="font-black mb-6 text-black/80">
            موجودی شما در تاریخ {data.IRDate} واریز میشود لطفا تا آن زمان صبور
            باشید
          </h2>
          <h3 className=" font-semibold tracking-wider">
            <div className="flex gap-1 sm:text-base text-sm">
              مبلغ{" "}
              <span className="text-secondary mx-0.5">{info?.WithdrawalBalance}$</span>{" "}
              معادل{" "}
              <span className="text-tertiary">
                {info?.WithdrawalBalanceIR} تومان
              </span>{" "}
            </div>
            <div className="flex">به شماره حساب اعلامی شما واریز میشود</div>
          </h3>
        </div>
      </nav>
      <nav className="md:w-7/12 w-full mt-14 ">
        <h1 className="md:mr-14 mr-0">زمان باقی مانده تا واریز:</h1>
      </nav>
      <article className="md:w-7/12 mx-auto flex mt-4 items-center justify-center ">
        {loading ? (
          <Loader className="!w-7 !h-7" />
        ) : (
          <>
            <div className="w-16 h-[71px] text-center rounded-lg font-bold mx-auto bg-neutral-100 p-1.5 flex flex-col justify-between">
              <h1 className="text-gray-500">ثانیه</h1>
              <h2 className="text-[21px]">{seconds}</h2>
            </div>
            <h1 className="text-4xl font-semibold">:</h1>
            <div className="w-16 h-[71px] text-center rounded-lg font-bold mx-auto bg-neutral-100 p-1.5 flex flex-col justify-between">
              <h1 className="text-gray-500">دقیقه</h1>
              <h2 className="text-[21px]">{minutes}</h2>
            </div>
            <h1 className="text-4xl font-semibold">:</h1>
            <div className="w-16 h-[71px] text-center rounded-lg font-bold mx-auto bg-neutral-100 p-1.5 flex flex-col justify-between">
              <h1 className="text-gray-500">ساعت</h1>
              <h2 className="text-[21px]">{hours}</h2>
            </div>
            <h1 className="text-4xl font-semibold">:</h1>
            <div className="w-16 h-[71px] text-center rounded-lg font-bold mx-auto bg-neutral-100 p-1.5 flex flex-col justify-between">
              <h1 className="text-gray-500">روز</h1>
              <h2 className="text-[21px]">{days}</h2>
            </div>
          </>
        )}
      </article>
    </section>
  );
}

export default SectionThree;
