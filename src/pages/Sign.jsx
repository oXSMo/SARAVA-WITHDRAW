import React, { useEffect, useState } from "react";
import {
  Link,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Nav from "../components/Sign/Nav";
import TimeLine from "../components/Sign/TimeLine";
import FooterSign from "../components/Sign/FooterSign";
import { authSlice, signSlice, userInfoSlice } from "../store/useStore";
import axios from "axios";

function Sign() {
  const { auth } = authSlice();
  const { pathname } = useLocation();


  const { credentials, setCredentials } = signSlice();
  const { setInfo } = userInfoSlice();

  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      navigate("/sign/1");
    } else {
      axios
        .post("https://sarava.finance/api/v1/user/info/retrieve", {
          TrackingID: Number(auth),
        })
        .then(({ data }) => {
          setInfo({ ...data });
        })
        .catch((err) => console.log({ err }));
      setCredentials({ ...credentials, TrackingID: auth });
      (pathname === "/sign" || pathname ==="/sign/") && navigate("/sign/3")
    }
  }, [navigate]);

  return (
    <section className="w-full   rtl">
      <Nav />
      <section className="sm:h-[calc(100vh-64px)] h-[calc(100vh-144px)] w-full flex">
        <Outlet />
        <TimeLine />
      </section>
      <FooterSign />
    </section>
  );
}
export default Sign;
