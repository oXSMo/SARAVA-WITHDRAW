import { create } from "zustand";

export const signSlice = create((set) => ({
  credentials: {
    PhoneNumber: "",
    UserId: "",
    VerifyToken: "",
    VerifyCode: "",
    Firstname: "",
    Lastname: "",
    Gender: "MALE",
    DateOfBirth: "",
    Province: "",
    CardNumber: "",
    ShebaCardNumber: "",
    currency: "USDT",
    TrackingID: "",
  },
  setCredentials: (value) => set({ credentials: value }),
}));

export const sectionSlice = create((set) => ({
  section: 1,
  setSection: (section) => set({ section: section + 1 }),
}));

export const modalSlice = create((set) => ({
  openModal: false,
  setopenModal: (value) => set({ openModal: value }),
}));

export const authSlice = create((set) => ({
  auth: localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth")).exipred > Date.now()
      ? JSON.parse(localStorage.getItem("auth")).auth
      : ""
    : "",
  setAuth: (auth) =>
    set(() => {
      localStorage.setItem(
        "auth",
        JSON.stringify({ auth, exipred: Date.now() + 24 * 60 * 60 * 1000 })
      );
      return { auth: auth };
    }),
}));

export const userInfoSlice = create((set) => ({
  info: {},
  setInfo: (value) => set({ info: value }),
}));

export const openSlice = create((set) => ({
  nav: false,
  setNav: (value) => set({ nav: value }),
  closeModal: false,
  setCloseModal: (value) => set({ closeModal: value }),
  optErrModal: false,
  setOptErrModal: (value) => set({ optErrModal: value }),
}));
