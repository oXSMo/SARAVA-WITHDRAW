import React, { useEffect, useRef, useState } from "react";
import {
  CloseGlass,
  ExitIcon,
  KeySquarIcon,
  PeopleIcon,
  PersonIcon,
  PhoneIcon,
  Word,
} from "../../icons/icons";
import Input from "../common/Input";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";
import { modalSlice, openSlice, signSlice } from "../../store/useStore";
import Modal from "../layout/Modal";
import Loader from "../common/Loader";
import { useAuth, useTrack } from "../hooks/useSign";

function FirstSection() {
  const {
    credentials,
    credentials: { UserId, PhoneNumber },
    setCredentials,
  } = signSlice();

  const { openModal, setopenModal } = modalSlice();

  const { sendOtp, err, loading } = useAuth();

  const { loading: loading2, setTrack, err: err2 } = useTrack();

  const Submit = async () => {
    await sendOtp();
  };

  const sendTRACK = async () => {
    await setTrack();
  };

  return (
    <>
      <section className="w-full flex flex-col h-full pt-4 overflow-auto">
        <h1 className="font-bold tracking-wide text-2xl text-center mt-2 mb-4">
          لطفا اطلاعات حساب سرمایه گذاری خود را وارد کنید
        </h1>
        <article className="mx-auto sm:w-auto w-full px-8">
          <div className="mb-4">
            <Input
              setState={setCredentials}
              value={credentials}
              className="sm:w-96 w-full"
              classPrefix=""
              type="number"
              name="PhoneNumber"
              title="شماره تلفن خود را وارد کنید"
              message={PhoneNumber ? err.PhoneNumber : "شماره با 09 شروع شود"}
              maxLength={11}
              icon={<PhoneIcon />}
              placeholder="09123456789"
              success={PhoneNumber ? (err.PhoneNumber ? 1 : 2) : 0}
            />
          </div>
          <Input
            setState={setCredentials}
            value={credentials}
            className="md:w-96"
            maxLength={12}
            name="UserId"
            title="ایدی عددی خود را وارد کنید"
            message={
              UserId
                ? err.UserId
                : "ایدی عددی و شماره تلفن باید هر دو مربوط به یک اکانت باشند"
            }
            type="number"
            icon={<PersonIcon />}
            placeholder="123456789"
            success={UserId ? (err.UserId ? 1 : 2) : 0}
          />

          <Button
            disabled={
              !(PhoneNumber && UserId) ||
              loading ||
              err.PhoneNumber ||
              err.UserId
            }
            onClick={() => {
              Submit();
            }}
            className={`w-full mt-4 mb-6`}
          >
            <div className="flexgap">
              {loading ? <Loader /> : " مرحله بعدی"}
            </div>
          </Button>
        </article>
        <div className="mx-auto rounded-full py-px bg-black/20 justify-self-center w-4/12 mb-10 my-6" />
        <article className="mx-auto sm:w-5/12 w-10/12">
          <h1 className="text-center font-bold mb-4">
            قبلا اطلاعات حساب خود را وارد کرده اید؟
          </h1>
          <h2 className="text-center text-sm mb-2">
            برای بررسی و پیگیری درخواست، لطفاً کد پیگیری خود را در کادر زیر وارد
            کنید.
          </h2>
          <aside
            className={`w-56 rounded-xl bg-[#EFEFEF] items-center text-sm h-10 mx-auto my-2 flex justify-between overflow-hidden ${
              err2 && "border-2 border-red-500"
            }`}
          >
            <input
              type="text"
              placeholder="کد پیگیری"
              maxLength={9}
              value={credentials.TrackingID}
              onChange={(e) => {
                !isNaN(Number(e.target.value)) &&
                  setCredentials({
                    ...credentials,
                    TrackingID: e.target.value,
                  });
              }}
              className={`w-8/12 text-gray-700 font-bold bg-transparent outline-none h-full px-2 pr-4 ${
                err2 && "!text-red-500"
              }`}
            />
            <div className={`h-4 w-px bg-black/30 ${err2 && "bg-red-500"}`} />
            <button
              onClick={sendTRACK}
              disabled={loading2 || credentials.TrackingID.length !== 9}
              className={`text-gray-400 font-semibold mx-auto cursor-not-allowed text-lg ${
                credentials.TrackingID.length === 9 &&
                "!text-secondary cursor-pointer"
              } `}
            >
              <div className={`flexgap ${err2 && "!text-red-500"}`}>
                {loading2 ? <Loader className="!w-4 !h-4" /> : "ثبت"}
              </div>
            </button>
          </aside>
          {err2 && (
            <h2 className="text-center text-xs text-red-500 mb-2">
              کد پیگیری صحیح نمیباشد
            </h2>
          )}
        </article>
      </section>
      <OtpModal open={openModal} setOpen={setopenModal} />
      <CloseModal />
    </>
  );
}

{
  /*
  !!!!!!!/ OtpModal !!!!!!!/
  */
}

const OtpModal = ({ open, setOpen }) => {
  const [otp, setotp] = useState([...Array(4)].fill(""));
  const { credentials, setCredentials } = signSlice();
  const { checkOtp, loading, err, sendOtp } = useAuth();

  const SubmitCheckOtp = async () => {
    await checkOtp();
  };

  const send = async () => {
    setSeconds(30);
    await sendOtp();
  };

  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    setSeconds(30);
  }, [open]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prevSeconds) => prevSeconds - 1);
      } else {
        clearInterval(intervalId);
        console.log("Countdown finished!");
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [seconds]);

  const handleChange = (e, i) => {
    if (!isNaN(Number(e.target.value))) {
      setotp([
        ...otp.map((data, index) => (index === i ? e.target.value : data)),
      ]);
      if (i !== 3) {
        if (e.target.value.length) {
          document.getElementById(`otp-${i + 1}`).focus();
        }
      }
      if (i !== 0) {
        if (!e.target.value.length) {
          document.getElementById(`otp-${i - 1}`).focus();
        }
      }
    }
  };

  useEffect(() => {
    setCredentials({ ...credentials, VerifyCode: otp.join("") });
  }, [otp]);

  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
      }}
    >
      <article className="sm:w-[560px] overflow-hidden w-[calc(100vw)] sm:h-[400px] min-h-[380px] sm:scale-100 scale-75 bg-neutral-100 flex flex-col justify-between rounded-3xl  ">
        <aside className="w-full text-[17px] text-gray-600 bg-[#D4D4D4] font-bold text-center py-3">
          ورود کد تایید
        </aside>
        <nav className="w-full h-full flex flex-col justify-between p-4">
          <h1 className="flex gap-3 text-secondary items-center font-semibold">
            <KeySquarIcon /> یک کد تایید به حساب شما در تلگرام شما ارسال شد
          </h1>
          <h2 className="my-2 text-[15px] text-black/80 font-black">
            جهت تأیید هویت، کد تأیید را از ربات سرآوا دریافت کرده و اینجا وارد
            کنید.
          </h2>
          <nav className="flex justify-center w-full sm:gap-6 ltr">
            {otp.map((data, index) => (
              <input
                type="text"
                key={`otp-${index}`}
                id={`otp-${index}`}
                maxLength={1}
                inputMode="numeric"
                value={data}
                onChange={(e) => {
                  handleChange(e, index);
                }}
                className={`py-[22px] w-[66px] sm:scale-100 scale-75 text-secondary text-4xl font-semibold rounded-2xl text-center bg-[#e6e6e6] outline-secondary duration-300 ${
                  credentials.VerifyCode.length === 4 && "ring-4 ring-secondary"
                } ${
                  err.VerifyCode &&
                  "!ring-red-600 !outline-red-600 !text-red-600"
                }`}
              />
            ))}
          </nav>
          {err.VerifyCode && (
            <h6 className="w-full mt-3 text-center text-sm text-red-500">
              {err.VerifyCode}
            </h6>
          )}
          <h3
            onClick={() => {
              seconds ? () => {} : send();
            }}
            className={`my-3 text-[15px] cursor-not-allowed text-gray-500 ${
              !seconds && "text-secondary hover:text-blue-500 !cursor-pointer"
            }`}
          >
            ارسال مجدد کد تایید ({seconds})
          </h3>
          <h4
            onClick={() => {
              setOpen(false);
              setCredentials({ ...credentials, PhoneNumber: "" });
              document.getElementById("PhoneNumber").focus();
            }}
            className="text-secondary hover:text-blue-400 cursor-pointer"
          >
            ( {credentials.PhoneNumber} ) تغییر شماره تلفن
          </h4>
          <Button
            disabled={!(credentials.VerifyCode.length === 4) || loading}
            onClick={() => {
              SubmitCheckOtp();
            }}
            className={`w-10/12 mx-auto mt-4 `}
          >
            <div className="flexgap">
              {loading ? <Loader /> : " مرحله بعدی"}
            </div>
          </Button>
        </nav>
      </article>
    </Modal>
  );
};

{
  /*
  !!!!!!!/ CLOSE MODAL !!!!!!!/
  */
}

const CloseModal = () => {
  const { setOptErrModal: setOpen, optErrModal: open } = openSlice();

  return (
    <Modal
      onClose={() => {
        setOpen(false);
      }}
      open={open}
    >
      <article className="h-[310px] relative sm:w-[480px]  scale over bg-[#FA3D31] rounded-2xl sm:scale-100 scale-75 pt-1.5 w-full">
        <CloseGlass className="absolute -translate-x-1/2 left-1/2 -translate-y-12" />
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
            <h1 className="text-[#FA3D31] text-[22px] font-bold text-center tracking-wider">
              خطای ثبت نام
            </h1>
          </nav>

          <nav className="text-black/70 text-center sm:px-8 px-3 text-[15px]">
            این ایدی عددی و شماره موبایل قبلا ثبت شده است! در صورتی که این
            اطلاعات متعلق به شماست و شما ثبتنام نکرده اید با پشتیبانی در تماس
            باشید و در غیر این صورت با کد پیگیری خود اقدام به پیگیری وضعیت
            درخواستتان کنید .
          </nav>

          <nav className="flex justify-center sm:gap-9 gap-6">
            <Button
              onClick={() => {
                setOpen(false);
              }}
              className={`sm:w-44 w-36 py-3.5 text-sm mb-6`}
            >
              <div className="flexgap">متوجه شدم</div>
            </Button>
            <button
              onClick={() => {
                setOpen(false);
              }}
              className="sm:w-44 w-36 text-[#FA3D31] items-center h-12 py-3.5 text-sm flex justify-center gap-3 font-semibold tracking-wider hover:scale-105 duration-300"
            >
              <div className="w-4 h-4 grid place-content-center rounded-full p-1.5 bg-[#FA3D31]">
                <ExitIcon className="text-white w-5 h-5" />
              </div>
              بستن
            </button>
          </nav>
        </aside>
      </article>
    </Modal>
  );
};

export default FirstSection;
