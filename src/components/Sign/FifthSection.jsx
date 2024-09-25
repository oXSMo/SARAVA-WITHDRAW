import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import PaymentLine from "./Payment/PaymentLine";
import { authSlice, sectionSlice, signSlice } from "../../store/useStore";
import Button from "../common/Button";
import { ExclamationMark, QuestionMarkIcon } from "../../icons/icons";
import { SectionZero } from "./Payment/SectionZero";
import { SectionOne } from "./Payment/SectionOne";
import SectionThree from "./Payment/SectionThree";
import SectionTwo from "./Payment/SectionTwo";
import axios from "axios";
import Loader from "../common/Loader";
import { useCheckPayment } from "../hooks/useSign";

function FifthSection() {
  const { section, setSection } = sectionSlice();
  const { auth } = authSlice();
  const { loading  } = useCheckPayment();

  

  return (
    <section className="w-full  flex flex-col items-center h-full py-4  overflow-auto">
      {/*
       ////! TITLE !////  
       */}
      <h1 className="font-bold tracking-wide  text-2xl text-center mt-2 mb-4">
        در انتظار پرداخت توسط کاربر
      </h1>
      <PaymentLine />
      <nav className="w-full h-full ">
        {loading ? (
          <div className="flexgap h-full">
            <Loader className="!w-10 !h-10" />
          </div>
        ) : section === 1 ? (
          <SectionZero />
        ) : section === 2 ? (
          <SectionOne />
        ) : section === 3 ? (
          <SectionTwo />
        ) : (
          section === 4 && <SectionThree />
        )}
      </nav>
      <div className="w-6/12 mt-5 rounded-xl sm:flex hidden mx-auto py-[1.5px] bg-black/40" />
      <article className="my-4 items-center sm:flex hidden gap-4">
        <aside className="flex h-full flex-col justify-between">
          <h1 className="font-black text-[15px]">
            ایدی پشتیبانی سرآوا در تلگرام
          </h1>
          <div className="flex justify-end">
            <a
              target="_blank"
              href="Https://t.me/AvaSup"
              className="text-secondary cursor-pointer hover:text-blue-700 font-bold"
            >
              Https://t.me/AvaSup
            </a>
          </div>
          <a
            target="_blank"
            href="https://t.me/avasup"
            className="mx-1 text-secondary text-[13px] font-black items-center rounded-[12px] hover:scale-105 duration-300 border-4 border-secondary flex justify-center gap-3 py-1.5"
          >
            <QuestionMarkIcon />
            تماس با پشتیبانی
          </a>
        </aside>
        <div className="w-[3px] h-16 rounded-md bg-black/40" />

        <img
          src="https://i.ibb.co/nRmZQ7j/Telegram.png"
          className="w-28 cursor-pointer"
        />
      </article>
    </section>
  );
}

export default FifthSection;
