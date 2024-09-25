import React, { useEffect } from "react";
import {
  DollarCircle,
  EmptyWalletIcon,
  ExclamationMark,
  MathIcon,
} from "../../icons/icons";
import Button from "../common/Button";
import { signSlice, userInfoSlice } from "../../store/useStore";
import { useNavigate } from "react-router-dom";
import { useGetBalance } from "../hooks/useSign";
import Loader from "../common/Loader";

function ThirsSection() {
  const { credentials, setCredentials } = signSlice();
  const { getbalance, balance, loading } = useGetBalance();
  const { info } = userInfoSlice();

  console.log(balance);

  useEffect(() => {
    if (credentials.TrackingID) {
      (async () => {
        await getbalance();
      })();
    }
  }, [credentials.TrackingID]);

  const navigate = useNavigate();

  return (
    <section className="w-full justify-between flex flex-col items-center h-full py-4 px-4 overflow-auto">
      {/*
       ////! TITLE !////  
       */}
      <h1 className="font-bold tracking-wide  text-2xl text-center mt-2 mb-4">
        وضعیت موجودی حساب شما{" "}
      </h1>

      {/*
       ////! BODY !////  
       */}
      <article className="">
        <aside className="flex gap-4 flex-wrap text-[15px] font-bold">
          <nav className="sm:w-[270px] w-full h-[130px]  flex flex-col py-2 px-4 justify-between bg-[#F6F4F4] rounded-2xl ">
            {loading ? (
              <div className="flexgap h-full">
                <Loader className="!w-10 !h-10" />
              </div>
            ) : (
              <>
                <EmptyWalletIcon />
                <h1 className="-translate-y-1">موجودی فعلی کیف پول</h1>

                <h2 className="text-[22px] text-secondary mr-auto tracking-widest">
                  {balance.CurrentBalance}$
                </h2>
              </>
            )}
          </nav>

          <nav className="sm:w-[450px] w-full h-[130px] flex flex-col justify-between py-2 px-4 bg-[#F6F4F4] rounded-2xl">
            {loading ? (
              <div className="flexgap h-full">
                <Loader className="!w-10 !h-10" />
              </div>
            ) : (
              <>
                <MathIcon />
                <h1 className="-translate-y-1">مقدار دیرکرد محاسبه شده</h1>
                <div className="flex justify-between">
                  <h2 className="text-xl text-tertiary">14,912,500 تومان</h2>
                  <h3 className="text-[22px] text-secondary mr-auto tracking-widest">
                    {balance.DelayedBalance}$
                  </h3>
                </div>
              </>
            )}
          </nav>
        </aside>
        <div className="mx-auto w-8/12 h-[3px] bg-black/20 my-6" />
        {/*
       ////! BLUE !////  
       */}
        <nav className="h-[130px] flex text-[#D4D4D4] flex-col justify-between px-4 py-2 w-full bg-secondary rounded-2xl shadow-2xl shadow-secondary mb-6">
          {loading ? (
            <div className="flexgap h-full">
              <Loader className="!w-10 !h-10" />
            </div>
          ) : (
            <>
              <DollarCircle className="w-5 h-5 text-black" />
              <h1 className="text-sm -translate-y-1">مقدار قابل برداشت</h1>
              <div className="flex justify-between font-bold">
                <h2 className="text-xl ">14,912,500 تومان</h2>
                 {balance.WithdrawalBalance}$
              </div>
            </>
          )}
        </nav>

        <div className="max-w-[720px] flex text-gray-600 items-center">
          <ExclamationMark className=" w-6 h-6 -translate-y-2" />
          <h1 className="text-start text-sm px-4">
            مقدار نمایش داده شده، شامل مجموع موجودی کیف پول شما و دیرکرد مربوط
            به این مدت است. شما می‌توانید از این مبلغ برای برداشت استفاده کنید.
          </h1>
        </div>
      </article>
      {/*
       ////! NEXT BUTTON !////  
       */}
      <article className="sm:px-0  sm:w-[720px] w-full grid">
        <Button
          disabled={loading}
          onClick={() => {
            navigate(`/sign/${info.CardInfoSubmitted ? "5" : "4"}`);
          }}
          className={`w-36 py-3.5 justify-self-end mt-4 text-sm`}
        >
          <div className="flexgap">
            {loading ? <Loader className="w-4 h-4" /> : "مرحله بعدی"}
          </div>
        </Button>
      </article>
    </section>
  );
}

export default ThirsSection;
