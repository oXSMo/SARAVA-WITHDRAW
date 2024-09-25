import { useEffect, useState } from "react";
import {
  CloseGlass,
  CopyIcon,
  EditIcon,
  ExclamationMark,
  ExclamationSign,
  ExitIcon,
} from "../../../icons/icons";
import {
  openSlice,
  sectionSlice,
  signSlice,
  userInfoSlice,
} from "../../../store/useStore";
import Button from "../../common/Button";
import Loader from "../../common/Loader";
import { useCreatePayment } from "../../hooks/useSign";
import Modal from "../../layout/Modal";

export const SectionOne = () => {
  const { setSection } = sectionSlice();
  const { info } = userInfoSlice();
  const { credentials, setCredentials } = signSlice();
  const { err, loading, setPay } = useCreatePayment();
  const [open, setopen] = useState(true);

  const { setCloseModal, closeModal } = openSlice();
  const [isDisabled, setIsDisabled] = useState(false);
  const [seconds, setSeconds] = useState(10);

  const submitHandler = async () => {
    setIsDisabled(true);
    setSeconds(60);
    await setPay();
  };

  useEffect(() => {
    if (isDisabled) {
      const intervalId = setInterval(() => {
        if (seconds > 0) {
          setSeconds((prevSeconds) => prevSeconds - 1);
        } else {
          clearInterval(intervalId);
          console.log("Countdown finished!");
        }
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [seconds, isDisabled]);
  if (isDisabled) if (seconds === 0) setIsDisabled(false);

  return (
    <section className="sm:w-9/12 sm:mx-auto mx-4">
      <h1 className="text-[15px] font-black mb-2">
        در انتظار پرداخت توسط کاربر:
      </h1>
      <nav className="sm:w-9/12 w-full mx-auto">
        <h2 className=" my-1 text-[17px] mb-10 text-center w-full mx-auto text-gray-700">
          مبلغ پرداختی شما بعد از پردازش توسط سیستم به موجودی شما اضافه خواهد شد
          و کل موجودی به همراه مبلغ پرداختی شما به حسابتان واریز میشود
        </h2>

        <aside className="w-full flex sm:flex-row flex-col  items-center mx-auto justify-between">
          <div className="flex gap-3 sm:w-9/12 w-full justify-center sm:justify-normal">
            <button
              disabled={isDisabled}
              onClick={() => {
                setCredentials({ ...credentials, currency: "USDT" });
              }}
              className={`rounded-full  items-center duration-500 font-black py-1.5 bg-[#F6F4F4] px-3 text-gray-500 text-xs flex gap-2 ${
                credentials.currency === "USDT" &&
                "ring-4 ring-secondary !text-secondary font-bold"
              } `}
            >
              <img
                src="https://i.ibb.co/MgXKFbz/image.png"
                className="w-5 h-5"
              />
              پرداخت با USDT (trc20)
            </button>
            <button
              onClick={() => {
                setCredentials({ ...credentials, currency: "TRON" });
              }}
              className={`rounded-full   items-center duration-500 font-black py-2.5 bg-[#F6F4F4] px-3 text-gray-500 text-xs flex gap-2 ${
                credentials.currency === "TRON" &&
                "ring-4 ring-secondary !text-secondary font-bold"
              }`}
            >
              <img
                src="https://i.ibb.co/gMH2ZTj/image.png"
                className="w-5 h-5"
              />
              پرداخت با TRON (trx){" "}
            </button>
          </div>

          <div className="text-xs flex sm:flex-col flex-row sm:gap-0 gap-2 font-black sm:mt-0 mt-4">
            <h1 className="mb-1">مقدار واریز:</h1>
            <h2 className="text-xs text-center flex justify-center gap-1">
              {info.ForcedToPayAmount}$
              <img
                src="https://i.ibb.co/MgXKFbz/image.png"
                className="w-4 h-4"
              />
            </h2>
          </div>
        </aside>

        <article className="w-full py-1 bg-neutral-100 items-center mt-4 pr-4 pl-2 rounded-2xl flex justify-between">
          <input
            type="text"
            value={info.PaymentAddress}
            className="w-9/12 bg-black sm:text-[15px] text-[10px] h-full bg-transparent outline-none"
          />
          <Button
            disabled={isDisabled}
            onClick={submitHandler}
            className="sm:text-sm text-xs sm:w-32 w-20 sm:!px-1 px-0"
          >
            <div className="flexgap">
              {isDisabled ? seconds : loading ? <Loader /> : " پرداخت کردم"}
            </div>
          </Button>
        </article>
        <h1 className="flex gap-1.5 text-[13px] items-center font-black text-gray-500 mt-2">
          {err ? (
            <h1 className="text-red-500 mr-2">چیزی اشتباه شد</h1>
          ) : (
            <>
              <ExclamationMark className="w-4 h-4" /> جهت کپی کردن ادرس کیف پول
              لطفا روی آن کلیک کنید
            </>
          )}
        </h1>
      </nav>
      <CloseModal open={closeModal} setOpen={setCloseModal} />
    </section>
  );
};

const CloseModal = ({ setOpen, open }) => {
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
              هیچ تراکنشی پیدا نشد
            </h1>
          </nav>

          <nav className="text-black/70 text-center sm:px-8 px-3 text-[15px]">
            متاسفانه، هیچ تراکنشی یافت نشد، در صورتی که از ارسال تراکنش خود
            اطمینان دارید تا تایید کامل آن در شبکه منتظر مانده و در صورتی که خطا
            برای بیش از ۱۵ دقیقه ادامه داشت با پشتیبانی ما در تماس باشید.
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


