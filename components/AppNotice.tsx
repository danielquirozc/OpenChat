"use client";

import { useEffect, useState } from "react";
import Modal from "./Shared/Modal";
import { Hammer } from "lucide-react";

export default function AlphaNotice() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const hideNotice = localStorage.getItem("alpha-notice");
    if (hideNotice) {
      setShow(false);
    }
    else {
      setShow(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem("alpha-notice", "true");
    setShow(false);
  };

  return (
    <>
      {show && (
        <Modal>
          <div className="flex justify-center items-center flex-col bg-white p-10 w-1/2 rounded-xl font-sans">
            <div className="flex items-start justify-center gap-2">
              <h2 className="text-2xl text-black font-semibold text-center mb-5">¡Esta aplicación se encuentra en fase de desarrollo!</h2>
            </div>
            <p className=" text-gray-600">
              Estamos trabajando para mejorar la experiencia de usuario y las
              funcionalidades de la aplicación. Si tienes alguna sugerencia o
              encuentras algun error, no dudes en contactarnos.
            </p>
            <button
              onClick={handleClose}
              className="bg-linear-to-t from-blue-600 to-blue-400 cursor-pointer hover:to-blue-600 text-white py-2 px-4 rounded-xl mt-5"
            >
              Entendido
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
