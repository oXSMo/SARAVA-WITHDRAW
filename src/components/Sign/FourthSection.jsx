import React, { useEffect, useRef, useState } from "react";
import { signSlice } from "../../store/useStore";
import {
  EditIcon,
  ExclamationMark,
  ExclamationSign,
  ExitIcon,
} from "../../icons/icons";
import Button from "../common/Button";
import Modal from "../layout/Modal";
import { useNavigate } from "react-router-dom";
import { useCardNumber } from "../hooks/useSign";
import Loader from "../common/Loader";

function FourthSection() {
  const [focus, setfocus] = useState(10);
  const [otp, setotp] = useState([...Array(4)].fill(""));
  const { setCredentials, credentials } = signSlice();
  const [openModal, setopenModal] = useState(false);

  console.log(credentials);

  const handleChange = (e, i) => {
    if (!isNaN(Number(e.target.value))) {
      setotp([
        ...otp.map((data, index) => (index === i ? e.target.value : data)),
      ]);
      if (e.target.value.length > 3) {
        document.getElementById(`${i + 1}`).focus();
      }
      if (!e.target.value.length) {
        document.getElementById(`${i - 1}`).focus();
      }
    }
  };

  const { loading, err } = useCardNumber;

  useEffect(() => {
    setCredentials({ ...credentials, CardNumber: otp.join("") });
  }, [otp]);

  return (
    <>
      <section className="w-full justify-between  flex flex-col items-center h-full py-4 px-4 overflow-auto">
        {/*
       ////! TITLE !////  
       */}
        <h1 className="font-bold tracking-wide  text-2xl text-center mt-2 mb-4">
          شماره کارت جهت برداشت موجودی{" "}
        </h1>

        <article className="">
          <h1 className=" text-[15px] tracking-wide">
            شماره کارت جهت واریز موجودی
          </h1>
          <aside className="flex items-center gap-1 my-4 ltr">
            {otp.map((data, index) => (
              <>
                <div
                  onFocus={() => setfocus(index)}
                  className={`md:w-[120px] w-[60px] h-[50px] rounded-2xl flex justify-center overflow-hidden ${
                    focus === index &&
                    "ring-[3px] ring-secondary text-secondary"
                  } ${err && "ring-[3px] ring-red-600 text-red-600"}`}
                >
                  <input
                    autoComplete="off"
                    id={index}
                    inputMode="numeric"
                    type="text"
                    maxLength={4}
                    placeholder="----"
                    value={data}
                    onChange={(e) => {
                      handleChange(e, index);
                    }}
                    className="font-semibold h-[50px] text-center sm:placeholder:text-2xl placeholder:text-2xl placeholder:translate-y-0.5 focus:placeholder:text-transparent translate-x-[2px] outline-none sm:tracking-[10px]  tracking-widest"
                  />
                </div>
                <div
                  className={`h-[3px] sm:w-4 w-2 rounded-lg mx-1 bg-black/60 ${
                    index === 3 && "hidden"
                  }`}
                />
              </>
            ))}
          </aside>

          <aside className="mt-12">
            <h1 className="text-sm text-black tracking-wide my-1.5">
              شماره شبا مربوط به کارت{" "}
            </h1>
            <div
              className={`w-full ltr h-12 px-6 flex items-center rounded-2xl bg-[#F6F4F4] ${
                /^.{20,28}$/.test(credentials.ShebaCardNumber) &&
                "ring-[3px] ring-secondary text-secondary"
              } ${err && "ring-[3px] ring-red-600 text-red-600"}`}
            >
              <div className=" flex justify-center sm:w-1/12">
                <h2
                  className={`text-black/25 text-lg mx-1 font-bold font-sans ${
                    (focus === 5 || credentials.ShebaCardNumber) &&
                    "!text-secondary"
                  } ${err && "!text-red-600"}`}
                >
                  IR -
                </h2>
              </div>
              <input
                onFocus={() => {
                  setfocus(5);
                }}
                type="text"
                maxLength={30}
                inputMode="numeric"
                className={`sm:w-10/12 w-10/12 bg-transparent outline-none px-2  font-bold sm:tracking-[7px] h-12 `}
                onChange={(e) => {
                  if (!isNaN(Number(e.target.value))) {
                    setCredentials({
                      ...credentials,
                      ShebaCardNumber: e.target.value,
                    });
                  }
                }}
                value={credentials?.ShebaCardNumber}
              />
            </div>
            {err && (
              <div className="text-[11px] mx-2 my-1.5 text-red-600 tracking-wider font-bold flex gap-1 items-center">
                {" "}
                <ExclamationMark />
                چیزی اشتباه شد
              </div>
            )}
          </aside>
        </article>
        <span className="sm:w-6/12 w-full  py-px my-4 bg-black/30 rounded-lg " />
        <article className="sm:w-7/12 w-full my-3">
          <p className="text-gray-500 text-[15px]">
            برداشت‌های شما از طریق حواله‌های پایا به حساب‌تان واریز می‌شود. سیکل
            و چرخه‌های واریز پایا طبق برنامه‌ریزی‌های بانک مرکزی به شرح زیر است.
            لطفاً توجه داشته باشید که زمان واریز ممکن است بسته به زمان درخواست
            شما متفاوت باشد.
          </p>
        </article>

        <article className="sm:w-7/12 w-full my-3 px-4">
          <h1 className="font-bold tracking-wide mb-2">
            ساعات انتقال وجه در سامانه پایا:
          </h1>
          <ul className="list-disc">
            <li className="text-[15px] text-gray-600">
              چرخه اول: ساعت ۳:۴۵ صبح – این چرخه جهت تسویه تراکنش‌های شاپرکی و
              غیرشاپرکی انجام می‌شود.
            </li>
            <li className="text-[15px] text-gray-600">
              چرخه دوم: حوالی ساعت ۱۰:۴۵ صبح.
            </li>
            <li className="text-[15px] text-gray-600">
              چرخه سوم: حوالی ساعت ۱۳:۴۵ بعدازظهر.
            </li>
            <li className="text-[15px] text-gray-600">
              چرخه چهارم: حوالی ساعت ۱۸:۴۵ بعدازظهر (این چرخه از سال ۱۴۰۰ اضافه
              شده است).
            </li>
          </ul>
        </article>

        <article className="sm:w-8/12 w-full text-[#F97F31] font-bold  text-[15px] rounded-xl flex gap-3  p-4  bg-[#E4CDB7]">
          <ExclamationMark className="w-10 h-10 -translate-y-2" />
          <p className="">
            موجودی شما به شماره کارتی که وارد می‌کنید واریز خواهد شد. لطفاً در
            وارد کردن شماره کارت و شماره شبای خود دقت کنید تا از بروز هرگونه
            مشکل جلوگیری شود.
          </p>
        </article>

        <article className="sm:px-0  sm:w-8/12 w-full grid">
          <Button
            disabled={
              !(
                credentials.ShebaCardNumber &&
                credentials.CardNumber.length === 16
              )
            }
            onClick={() => {
              setopenModal(true);
            }}
            className={`w-36 py-3.5 justify-self-end mt-4 text-sm`}
          >
            مرحله بعدی
          </Button>
        </article>
      </section>
      <ConfirmModal setotp={setotp} open={openModal} setOpen={setopenModal} />
    </>
  );
}

{
  /*
  !!!!!!!/ Confirm Modal !!!!!!!/
  */
}

const ConfirmModal = ({ open, setOpen, setotp }) => {
  const { credentials, setCredentials } = signSlice();

  const { err, loading, sendCard } = useCardNumber();

  const submitHandler = async () => {
    await sendCard();
  };

  return (
    <Modal
      onClose={() => {
        setOpen(false);
      }}
      open={open}
    >
      <article className="h-[310px] relative sm:w-[480px]  scale over bg-[#FC9737] rounded-2xl sm:scale-100 scale-75 pt-1.5 w-full">
        <ExclamationSign className="absolute -translate-x-1/2 left-1/2 -translate-y-12" />
        <aside className="w-full h-full rounded-2xl bg-white flex flex-col justify-between">
          <nav className="flex justify-end p-3">
            <button
              onClick={() => {
                setOpen(false);
              }}
              className="p-px cursor-pointer rounded-[10px] bg-red-600/40 hover:bg-red-600/60"
            >
              <ExitIcon />
            </button>
          </nav>

          <nav className="flex flex-col sm:w-11/12 px-2 mx-auto items-center gap-3">
            <h1 className="text-[#FC9737] text-[22px] font-bold text-center tracking-wider">
              از شماره کارت وارد شده مطمئنید؟
            </h1>
            <p className="text-center text-[15px] tracking-wide text-gray-600">
              موجودی شما به شماره کارتی که وارد میکنید واریز میشود، در صورتی که
              از صحت شماره کارت وارد شده مطمئن نیستید لطفا شماره کارت صحیح را
              وارد کنید
            </p>
          </nav>

          <nav className="flex justify-center sm:gap-9 gap-6">
            <Button
              onClick={submitHandler}
              className={`sm:w-44 w-36 py-3.5 text-sm mb-6`}
            >
              <div className="flexgap">
                {loading ? <Loader /> : " مرحله بعدی"}
              </div>
            </Button>
            <button
              onClick={() => {
                setOpen(false);
                setCredentials({ ...credentials, CardNumber: "" });
                document.getElementById(0).focus();
                setotp([...Array(4)].fill(""));
              }}
              className="sm:w-44 w-36 h-12 py-3.5 text-sm flex justify-center gap-3 text-secondary font-semibold tracking-wider hover:scale-105 duration-300"
            >
              <EditIcon />
              ویرایش
            </button>
          </nav>
        </aside>
      </article>
    </Modal>
  );
};

export default FourthSection;
