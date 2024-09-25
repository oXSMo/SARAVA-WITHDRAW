import { useState } from "react";
import { CheckIcon, ExclamationMark } from "../../../icons/icons";
import { sectionSlice } from "../../../store/useStore";
import Button from "../../common/Button";

export function SectionZero() {
  const { setSection } = sectionSlice();
  const [check, setcheck] = useState(false);

  return (
    <section className="sm:w-9/12 sm:mx-auto mx-4">
      <h1 className="text-[17px] font-black mb-1">تایید اعتبار:</h1>
      <p className="text-black/70 text-[14px]">
        به جهت تخصیص دارایی‌ها و عملکرد سرآوا نسبت به تعهدات خود در بخش‌های
        مالی، تمام کاربران نیاز به تایید اعتبار خود به وسیله بازپرداخت بخشی از
        دارایی‌های خود در پلتفرم را دارند. توجه شما را به مطالعه دقیق نکات ذیل
        جلب می‌کنیم:
      </p>
      <ul className="list-decimal text-black/70 px-5 my-3 text-[15px] font-black mb-6">
        {[
          "شبکه مناسب: فقط از TRC20 یا شبکه اصلی Tron برای پرداخت استفاده کنید.",
          "بازگشت وجه: پس از تأیید اعتبار، مبلغ شما ظرف مدت زمان تعیین شدت به حساب بانکی‌تان واریز خواهد شد",
          "دقت در اطلاعات: در وارد کردن آدرس کیف پول و اطلاعات پرداخت دقت کنید.",
          "کارمزد شبکه: ممکن است پرداخت شما شامل کارمزد شبکه بلاک‌چین باشد."
        ].map((e, i) => (
          <li className="my-1" key={i}>
            {e}
          </li>
        ))}
      </ul>
      <aside className="flex items-center w-full justify-end gap-6">
        <h1
          onClick={() => {
            setcheck(!check);
          }}
          className="text-sm cursor-pointer font-black flex gap-3 items-center"
        >
          <button className="w-4 h-4 rounded-md border  grid place-content-center border-black">
            {check && <CheckIcon />}
          </button>
          متن بالارو کامل مطالعه کردم
        </h1>
        <Button
          disabled={!check}
          onClick={() => {
            setSection(1);
          }}
          className={`w-36 py-3.5 text-sm`}
        >
          مرحله بعدی
        </Button>
      </aside>
      <article className="w-full my-4 text-secondary font-bold  text-[15px] rounded-xl flex mx-auto gap-3  p-4  bg-[#B3C4EA]">
        <ExclamationMark className="w-10 h-10 -translate-y-2" />
        <p className="">
          لطفا کد پیگیری خود را نگه دارید تا در صورت نیاز به بررسی وضعیت
          درخواست، به راحتی به آن دسترسی داشته باشید.
        </p>
      </article>
    </section>
  );
}
