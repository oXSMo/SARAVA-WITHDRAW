import React, { useEffect, useState } from 'react'
import { DizzyIcon } from '../../icons/icons';
import { useLocation, useNavigate } from 'react-router-dom';

function ErrorSign() {
  const { pathname } = useLocation();
  console.log(pathname);
  
    const [seconds, setSeconds] = useState(15);
    const navigate = useNavigate();
    useEffect(() => {
      const intervalId = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else {
          clearInterval(intervalId);
          // Handle the timer completion here
        }
      }, 1000);
  
      if (seconds === 0) navigate("/sign/1");
  
      return () => clearInterval(intervalId);
    }, [seconds]);
  
    return (
      <section className="mx-auto text-center rtl flex h-full justify-center flex-col items-center w-full gap-2 text-black/80">
        <DizzyIcon className="w-44 h-w-44" />
        <h1 className="text-9xl font-serif flex -my-3 text-shadow text-quaternary">
          404
        </h1>
        <h3 className="text-lg font-bold text-secondary">خطا</h3>
        <h2 className="font-semibold -my-2 text-quaternary">صفحه یافت نشد</h2>
  
        <h4 className="text-black/80 text-sm mt-3">
        صفحه مورد نظر شما پیدا نشد. به عقب برگردید وگرنه در  .
          <span className="text-secondary font-bold ">{seconds}s</span> ثانیه به صفحه اصلی هدایت خواهید شد.
        </h4>
      </section>
    );
}

export default ErrorSign
