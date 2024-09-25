import React from "react";

const Modal = ({ children, open, onClose, className }) => {
  return (
    <article
      onClick={onClose}
      className={`fixed inset-0 z-50 flex justify-center items-center transition-colors ${
        open ? "visible bg-black/20" : "invisible"
      }`}
    >
      <aside
        onClick={(e) => e.stopPropagation()}
        className={` shadow  transition-all duration-500 ${className} ${
          open ? "scale-100 opacity-100" : "-translate-y-12 opacity-0"
        }`}
      >
        {children}
      </aside>
    </article>
  );
};

export default Modal;
