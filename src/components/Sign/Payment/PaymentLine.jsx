import React from "react";
import { sectionSlice, signSlice } from "../../../store/useStore";
import { CopyIcon } from "../../../icons/icons";

function PaymentLine() {
  const { credentials, setCredentials } = signSlice();
  const { section, setSection } = sectionSlice();

  console.log({ section });

  return (
    <section className="flex md:flex-row flex-col gap-4 mb-4 text-gray-50 items-center">
      <article className="flex md:gap-1 items-center">
        {[
          "ثبت اطلاعات",
          "تایید اعتبار",
          "در انتظار پرداخت",
          "درحال پردازش",
          "تایید نهایی",
        ].map((e, i) => (
          <>
            <article
              onClick={() => {}}
              className={`md:w-16 md:h-16 w-[60px] h-[60px] text-center font-bold  flex items-center rounded-full bg-[#EFEFEF] p-1 text-black justify-center text-[10px] duration-700  ${
                section > i && "!bg-secondary text-white"
              } ${section === i && "ring-2 ring-secondary duration-500 "}`}
            >
              {e}
            </article>
            <Line
              color={section > i ? "!bg-secondary" : "bg-gray-400"}
              className={` duration-300 text-neutral-100 ${
                i === 4 && "hidden"
              } `}
            />
          </>
        ))}
      </article>
      <article className="w-full sm:block flex -translate-y-2.5 justify-center gap-4 items-center">
        <h1 className="text-black/80 mb-1 mr-2 text-[15px] font-black">
          وضعیت درخواست{" "}
        </h1>
        <aside className=" w-full ltr items-center h-12 flex justify-between overflow-hidden bg-neutral-100 rounded-2xl">
          <div className="flex ml-2">
            <div
              onClick={() => {
                navigator.clipboard.writeText(
                  document.getElementById("copy-trackode").value
                );
              }}
              className="flex justify-center mx-2 cursor-pointer hover:text-gray-950 hover:scale-105 duration-150 text-gray-700"
            >
              <CopyIcon />
            </div>
            <div className="h-5 w-0.5 mx-0 bg-black/40 rounded-md" />
          </div>
          <input
            id="copy-trackode"
            autoComplete="off"
            type="text"
            value={credentials?.TrackingID}
            className="w-full outline-none ml-2 tracking-widest bg-transparent font-bold text-black pr-2"
            onChange={(e) => {
              if (!isNaN(Number(e.target.value)))
                setCredentials({
                  ...credentials,
                  trackcode: e.target.value,
                });
            }}
          />
        </aside>
      </article>
    </section>
  );
}

const Line = ({ className, color }) => (
  <div className={`flex gap-px ${className}`}>
    <span className={`md:w-1.5 h-1 duration-700 rounded-lg ${color}`} />
    <span className={`w-2 h-1 duration-700 delay-100 rounded-lg ${color}`} />
    <span
      className={`md:w-2.5 h-1  duration-700 delay-200 rounded-lg ${color}`}
    />
    <span
      className={`md:w-1.5 h-1 duration-700 delay-300 rounded-lg ${color}`}
    />
  </div>
);

export default PaymentLine;
