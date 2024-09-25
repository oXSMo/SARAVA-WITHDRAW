import React, { useState } from "react";
import Input from "../common/Input";
import Select from "../common/Select";
import {
  CalendarIcon,
  DateIcon,
  FemaleIcon,
  House2Icon,
  MaleIcon,
  PersonIcon,
  VillaIcon,
} from "../../icons/icons";
import { signSlice } from "../../store/useStore";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";
import { useInfo } from "../hooks/useSign";
import Loader from "../common/Loader";
import { provinces } from "../../utils/provience";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_en from "react-date-object/locales/persian_fa";

function SecondSection() {
  const { credentials, setCredentials } = signSlice();
 
  console.log({ credentials });


  const { err, loading, sendInfo } = useInfo();

  console.log({ err });

  const submitHandler = async () => {
    await sendInfo();
  };

  return (
    <section className="w-full flex flex-col items-center h-full py-4 overflow-auto ">
      {/*
       ////! TITLE !////  
       */}
      <h1 className="font-bold tracking-wide  text-2xl text-center mt-2 mb-4">
        اطلاعات لازم را جهت تکمیل پروفایل خود وارد کنید
      </h1>

      {/*
       ////! FIRST !////  
       */}
      <article className="px-8 w-full sm:w-auto">
        <aside className="flex sm:flex-row flex-col  w-full gap-4 flex-wrap ">
          <Input
            icon={<PersonIcon />}
            className="sm:w-[270px] w-full"
            name="Firstname"
            lang={true}
            value={credentials}
            setState={setCredentials}
            maxLength={14}
            placeholder="نام خود را وارد کنید"
            message={credentials.Firstname && err.Firstname}
            type="text"
            title="نام"
            success={
              !credentials.Firstname
                ? 0
                : credentials.Firstname.length > 2
                ? 2
                : 1
            }
          />
          <Input
            icon={<PersonIcon />}
            className="sm:w-[350px] w-full"
            name="Lastname"
            lang={true}
            value={credentials}
            maxLength={14}
            setState={setCredentials}
            message={credentials.Lastname && err.Lastname}
            placeholder="لطفا نام خانوادگی خود را وارد کنید"
            type="text"
            title="نام خانوادگی"
            success={
              !credentials.Lastname
                ? 0
                : credentials.Lastname.length > 2
                ? 2
                : 1
            }
          />
        </aside>
        <aside className="">
          <h1 className={`text-sm m-1 text-gray-500 font-bold `}>تاریخ تولد</h1>
          <article
            className={`sm:w-[270px] relative  flex gap-2.5  items-center border-2 border-transparent px-3 rounded-[14px] text-gray-400 font-bold bg-[#EFEFEF] rtl ${
              credentials.DateOfBirth &&
              "border-2 !text-secondary !border-secondary"
            }`}
          >
            <div className="w-[10%]">
              <DateIcon />
            </div>
            <div className={`w-0.5 h-6 rounded-full bg-gray-400 `} />
            <DatePicker
              calendar={persian}
              locale={persian_en}
              style={{
                cursor: "pointer",
                background: "transparent",
                padding: "5px 0px",
                border: "0",
                height: "100%",
                width: "100%",
              }}
             
              format="YYYY-MM-DD"
              onChange={(e) => {
                setCredentials({
                  ...credentials,
                  DateOfBirth: `${e.day}-${e.month.number}-${e.year}`,
                });
              }}
            />
            <CalendarIcon className="absolute left-3 pointer-events-none" />
          </article>
        </aside>

        <aside>
          <h1 className={`text-sm mt-5 m-1 text-gray-500 font-bold `}>
            جنسیت{" "}
          </h1>
          <nav className="flex gap-4">
            <button
              onClick={() => {
                setCredentials({ ...credentials, Gender: "MALE" });
              }}
              className={`py-2 bg-[#EFEFEF] border-2 p-3 duration-300 border-transparent rounded-2xl text-gray-400 font-bold  flex gap-2 ${
                credentials.Gender === "MALE" &&
                "!border-secondary !text-secondary"
              }`}
            >
              {<MaleIcon />}
              مرد
            </button>
            <button
              onClick={() => {
                setCredentials({ ...credentials, Gender: "FEMALE" });
              }}
              className={`py-2 bg-[#EFEFEF] border-2 p-3 border-transparent duration-300 rounded-2xl text-gray-400 font-bold  flex gap-2 ${
                credentials.Gender === "FEMALE" &&
                "!border-secondary !text-secondary"
              }`}
            >
              {<FemaleIcon />}
              زن
            </button>
          </nav>
        </aside>
      </article>

      <div className="mx-auto w-8/12 py-px bg-black/10 my-6" />

      {/*
       ////! SECOND !////  
       */}

      <article className="mb-6 flex sm:flex-row flex-col-reverse sm:w-auto w-full gap-4 flex-wrap px-8">
        
        <Select
          key={5}
          title="شهر محل سکونت"
          className="sm:w-[310px] w-full"
          icon={<House2Icon/>}
          options={["خراسان شمالی", "خراسان رضوی", "خراسان جنوبی"]}
          name="town"
          placeholder="انتخاب شهر"
          setCredentials={setCredentials}
          credentials={credentials}
        />
        <Select
          key={6}
          title="استان محل سکونت"
          className="sm:w-[310px] w-full"
          icon={<VillaIcon />}
          options={provinces}
          name="city"
          direction={false}
          placeholder="استان محل سکونت"
          setCredentials={setCredentials}
          credentials={credentials}
        />
      </article>
      {/*
       ////! NEXT BUTTON !////  
       */}
      <article className="sm:px-0 px-8 w-full sm:w-[636px] grid">
        <Button
          disabled={
            !(
              credentials.city &&
              credentials.town &&
              credentials.DateOfBirth &&
              credentials.Gender &&
              credentials.Lastname &&
              credentials.Firstname
            )
          }
          onClick={submitHandler}
          className={`sm:w-36 w-full py-3.5 justify-self-end mt-4 text-sm mb-6`}
        >
          <div className="flexgap">
            {loading ? <Loader className="w-4 h-4" /> : " مرحله بعدی"}
          </div>
        </Button>
      </article>
    </section>
  );
}

export default SecondSection;
