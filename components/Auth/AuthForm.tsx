"use client";
import { ApiError, ApiErrorType } from "@/types/ApiError";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Input from "../Shared/Input";
import Modal from "../Shared/Modal";

type UserInputData = {
  username: string;
  password: string;
};

type FormError = ApiError | null;

export default function DefaultUserName() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<FormError>(null);
  const [userData, setUserData] = useState<UserInputData>({
  	username: "",
    password: "",
  });

  const onChangeUserData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setError(null);
    setIsPending(true);
    const { value } = e.currentTarget;
    const path = value === "login" ? "login" : "create";
    const API_ENDPOINT = `/api/user/${path}`;
    const res = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data);
      setIsPending(false);
      return;
    }
    router.push("/chat");
  };

  return (
    <div>
      <Modal>
        <div className="bg-white font-sans p-5 rounded-xl shadow-lg m-5">
          <h2 className="text-2xl text-center font-bold mb-4">
            Bienvenido a OpenChat!
          </h2>
          <div className="">
            <p className="text-gray-700 max-w-96 mb-4">
              Por favor, ingresa un nombre de usuario y una contraseña para
              comenzar a chatear.
            </p>
            <Input
              type="text"
              name="username"
              label="Username"
              value={userData?.username}
              onChange={onChangeUserData}
            />
            <Input
              type="password"
              name="password"
              label="Password"
              value={userData?.password}
              onChange={onChangeUserData}
            />
            {error && error.type === ApiErrorType.ValidationError ? (
              <p className="text-red-500 text-sm my-2">
                {error.errors[0].message}
              </p>
            ) : null}
            {error && error.type === ApiErrorType.AppError ? (
              <p className="text-red-500 text-sm my-2">{error.message}</p>
            ) : null}
          </div>
          <div className="flex gap-2 mt-5">
            <button
              onClick={onClick}
              value="register"
              className="border border-gray-300 cursor-pointer hover:bg-gray-300 text-nowrap w-full text-black font-bold text-sm py-3 px-2 rounded-xl"
            >
              {isPending ? "Cargando..." : "Registrarse"}
            </button>
            <button
              value="login"
              onClick={onClick}
              className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-nowrap w-full text-white font-bold text-sm py-3 px-2 rounded-xl"
            >
              {isPending ? "Cargando..." : "Iniciar Sesión"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
