import { useEffect, useState } from "react";
import {
  authSlice,
  modalSlice,
  openSlice,
  sectionSlice,
  signSlice,
  userInfoSlice,
} from "../../store/useStore";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const [loading, setloading] = useState(false);

  const [err, setErr] = useState({
    PhoneNumber: "",
    UserId: "",
    VerifyCode: "",
    else: "",
  });
  const {
    credentials,
    credentials: { PhoneNumber, UserId, VerifyToken, VerifyCode },
    setCredentials,
  } = signSlice();
  const { setopenModal } = modalSlice();
  const navigate = useNavigate();

  const { setAuth } = authSlice();
  const { setOptErrModal: setOpen } = openSlice();
  const { info } = userInfoSlice();
  useEffect(() => {
    if (info?.PrivateInfoSubmitted) navigate("/sign/3");
  }, []);

  useEffect(() => {
    setErr({
      ...err,
      PhoneNumber: /^09\d{9}$/.test(PhoneNumber)
        ? ""
        : "لطفا شماره تلفن معتبر وارد کنید",
      UserId: /^\d{8,12}$/.test(UserId)
        ? ""
        : "لطفاً یک شناسه عددی معتبر وارد کنید",
    });
  }, [PhoneNumber, UserId]);

  const sendOtp = async () => {
    // if (handleSendOtpErr({ credentials, setErr })) return;
    setloading(true);
    try {
      const resp = await axios.post("https://sarava.finance/api/v1/user/auth", {
        PhoneNumber,
        UserId: Number(UserId),
      });
      if (resp.data) {
        setopenModal(true);
        setCredentials({ ...credentials, VerifyToken: resp.data.Response });
      } else setErr({ ...err, else: "something went wrong" });
    } catch (error) {
      error.response.status === 400
        ? setErr({ ...err, else: "", PhoneNumber: "Invalid Phone Number" })
        : error.response.status === 403
        ? setErr({
            ...err,
            else: "",
            UserId: "ایدی عددی و شماره تلفن باید هر دو مربوط به یک اکانت باشند",
            PhoneNumber:
              "ایدی عددی و شماره تلفن باید هر دو مربوط به یک اکانت باشند",
          })
        : error.response.status === 404
        ? setErr({ ...err, UserId: " ایدی عددی یافت نشد" })
        : setErr({ ...err, else: "something went wrong" });
    } finally {
      setloading(false);
    }
  };

  const checkOtp = async () => {
    setloading(true);
    try {
      const resp = await axios.post(
        "https://sarava.finance/api/v1/user/auth/verify",
        {
          VerifyToken,
          VerifyCode: Number(VerifyCode),
        }
      );
      if (resp.data) {
        setCredentials({ ...credentials, TrackingID: resp.data.Response });
        setopenModal(false);
        const resp2 = await axios.post(
          "https://sarava.finance/api/v1/user/info/retrieve",
          {
            TrackingID: Number(resp.data.Response),
          }
        );
        if (resp2.data) {
          resp2.data.PrivateInfoSubmitted
            ? navigate("/sign/3")
            : navigate("/sign/2");
          setAuth(resp.data.Response);
        }
      }
    } catch (error) {
      error.response.data.Meta.Error === "verification code has expired" &&
        setErr({ ...err, VerifyCode: "کد تأیید منقضی شده است" });
      error.response.data.Meta.Error === "invalid verification code" &&
        setErr({ ...err, VerifyCode: "کد تأیید نامعتبر است" });
      if (error.response.data.Meta.Error === "user already exists") {
        setopenModal(false);
        setOpen(true);
        setErr({ ...err, VerifyCode: "" });
      }
    } finally {
      setloading(false);
    }
  };

  return { loading, checkOtp, sendOtp, err };
};

export const useInfo = () => {
  const [loading, setloading] = useState(false);
  const [err, seterr] = useState({
    Firstname: "",
    Lastname: "",
    else: "",
  });

  const navigate = useNavigate();

  const { info } = userInfoSlice();
  useEffect(() => {
    if (info?.PrivateInfoSubmitted) navigate("/sign/3");
  }, [navigate]);
  const {
    credentials,
    credentials: {
      TrackingID,
      Firstname,
      Lastname,
      Gender,
      DateOfBirth,
      city,
      town,
    },
  } = signSlice();

  useEffect(() => {
    seterr({
      ...err,
      Firstname: Firstname.length > 2 ? "" : "لطفا نام معتبر را وارد کنید",
      Lastname:
        Lastname.length > 2 ? "" : "لطفاً نام خانوادگی معتبر را وارد کنید",
    });
  }, [Firstname, Lastname]);

  const sendInfo = async () => {
    setloading(true);
    try {
      const resp = await axios.post(
        "https://sarava.finance/api/v1/user/info/update",
        {
          TrackingID: Number(TrackingID),
          Firstname,
          Lastname,
          Gender,
          DateOfBirth,
          Province: `${city}-${town}`,
        }
      );

      if (resp.data) {
        navigate("/sign/3");
      }
    } catch (error) {
      seterr({ ...err, else: "somthing went wrong" });
    } finally {
      setloading(false);
    }
  };

  return { loading, err, sendInfo };
};

export const useTrack = () => {
  const [loading, setloading] = useState(false);
  const [err, seterr] = useState();

  const { credentials } = signSlice();
  const { setAuth } = authSlice();

  const navigate = useNavigate();

  const setTrack = async () => {
    setloading(true);
    try {
      const resp = await axios.post(
        "https://sarava.finance/api/v1/user/info/retrieve",
        {
          TrackingID: Number(credentials.TrackingID),
        }
      );
      if (resp.data) {
        resp.data.PrivateInfoSubmitted
          ? navigate("/sign/3")
          : navigate("/sign/2");
        setAuth(credentials.TrackingID);
        seterr(false);
      }
    } catch (error) {
      seterr(true);
    } finally {
      setloading(false);
    }
  };

  return {
    loading,
    err,
    setTrack,
  };
};

export const useGetBalance = () => {
  const [loading, setloading] = useState(false);
  const [balance, setbalance] = useState({});

  const { setInfo } = userInfoSlice();
  const {
    credentials: { TrackingID },
  } = signSlice();

  const navigate = useNavigate();
  const getbalance = async () => {
    setloading(true);
    try {
      const resp = await axios.post(
        "https://sarava.finance/api/v1/user/info/retrieve",
        {
          TrackingID: Number(TrackingID),
        }
      );

      if (resp.data) {
        setbalance(resp.data);
        setInfo(resp.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  return { getbalance, balance, loading };
};

export const useCardNumber = () => {
  const [loading, setloading] = useState(false);
  const [err, seterr] = useState(false);

  const {
    setCredentials,
    credentials: { ShebaCardNumber, CardNumber, TrackingID },
  } = signSlice();

  const navigate = useNavigate();

  const sendCard = async () => {
    setloading(true);
    try {
      const resp = await axios.post(
        "https://sarava.finance/api/v1/user/info/update",
        {
          CardNumber,
          ShebaCardNumber: `IR${ShebaCardNumber}`,
          TrackingID: Number(TrackingID),
        }
      );
      if (resp.data) {
        seterr(false);
        navigate("/sign/5");
      }
    } catch (error) {
      seterr(true);
    } finally {
      setloading(false);
    }
  };

  return { sendCard, err, loading };
};

export const usePay = () => {
  const [loading, setloading] = useState(false);

  const [err, seterr] = useState(false);
  const { auth } = authSlice();

  useEffect(() => {
    (async () => {
      setloading(true);
      try {
        const resp = await axios.post(
          "https://sarava.financehttps://sarava.finance/api/v1/user/info/retrieve",
          { TrackingID: Number(auth) }
        );
        if (resp.data) {
          const { Meta, ...DATA } = resp.data;
          setdetails(DATA);
        }
      } catch (error) {
        seterr(true);
      } finally {
        setloading(false);
      }
    })();
  }, []);
};

export const useConfig = () => {
  const [loading, setloading] = useState(false);
  const [data, setdata] = useState({ MilliUnix: "", IRDate: "" });
  const [err, seterr] = useState(false);

  useEffect(() => {
    (async () => {
      setloading(true);
      try {
        const resp = await axios.get("https://sarava.finance/api/v1/config");
        if (resp.data) {
          setdata(resp.data);
          seterr(false);
        }
      } catch (error) {
        seterr(true);
      } finally {
        setloading(false);
      }
    })();
  }, []);

  return {
    err,
    loading,
    data,
  };
};

export const useCreatePayment = () => {
  const [loading, setloading] = useState(false);
  const [err, seterr] = useState(false);
  const { auth } = authSlice();
  const { setCloseModal } = openSlice();
  const { setCredentials } = signSlice();
  const setPay = async () => {
    setloading(true);
    try {
      const resp = await axios.post(
        "https://sarava.finance/api/v1/user/payment/verify",
        {
          TrackingID: Number(auth),
        }
      );
      if (resp.data.Response === "no transaction found") {
        setCloseModal(true);
        setCred;
        seterr(false);
      }
      if (
        resp.data.Response === "user transaction has been completely confirmed"
      ) {
        resp.data.CurrentStep === "UserPaymentCreationAndConfirmation" &&
          setSection(2);
        resp.data.CurrentStep === "UserFinalWithdrawalRequestProcess" &&
          setSection(3);
      }
    } catch (error) {
      seterr(true);
    } finally {
      setloading(false);
    }
  };

  return { err, loading, setPay };
};

export const useCheckPayment = () => {
  const { section, setSection } = sectionSlice();

  const [loading, setloading] = useState(false);
  const { auth } = authSlice();

  useEffect(() => {
    (async () => {
      setloading(true);
      try {
        const resp = await axios.post(
          "https://sarava.finance/api/v1/user/payment/verify",
          { TrackingID: Number(auth) }
        );
        if (resp.data.Response === "no transaction found")
          section > 2 && setSection(0);
        if (
          resp.data.Response ===
          "user transaction has been completely confirmed"
        ) {
          resp.data.CurrentStep === "UserPaymentCreationAndConfirmation" &&
            setSection(2);
          resp.data.CurrentStep === "UserFinalWithdrawalRequestProcess" &&
            setSection(3);
        }

        // console.log(res);
      } catch (error) {
        console.log(error);
      } finally {
        setloading(false);
      }
    })();
  }, [section]);

  return { loading };
};
