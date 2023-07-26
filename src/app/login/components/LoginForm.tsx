"use client";

import Spinner from "@/app/components/Spinner";
import { ChangeEvent, FormEvent } from "react";
import { useState, useEffect } from "react";
import { MdOutlineWarningAmber } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "@/app/auth-provider";

const initInputsValidState = {
  login: false,
  password: false,
};

export default function LoginForm() {
  const [user, setUser] = useState<UserLoginData>({
    login: "",
    password: "",
  });
  const [wiggleForm, setWiggleForm] = useState<boolean>(false);
  const [invalidInputs, setInvalidInputs] =
    useState<ValidLoginInputs>(initInputsValidState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const { setAuth } = useContext(AuthContext);

  const handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void = (e) =>
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleFormSubmission: (e: FormEvent<HTMLFormElement>) => void = async (
    e
  ) => {
    e.preventDefault();
    setInvalidInputs(initInputsValidState);

    if (user.login === "") {
      setInvalidInputs((prev) => ({ ...prev, login: true }));
      setWiggleForm(true);
      return;
    }

    if (user.password === "") {
      setInvalidInputs((prev) => ({ ...prev, password: true }));
      setWiggleForm(true);
      return;
    }

    setIsLoading(true);

    try {
      const response: Response = await fetch("/api/login", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const error: ResponseError = await response.json();
        setError(error.message);
        return;
      }

      const data: LoginResponseData = await response.json();
      const { name } = data;

      setAuth({
        name,
      });

      setUser({
        login: "",
        password: "",
      });

      router.replace("/search-history");
    } catch (error) {
      setError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (wiggleForm) {
      timeout = setTimeout(() => {
        setWiggleForm(false);
      }, 1000);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [wiggleForm]);

  return (
    <form
      className={`${
        wiggleForm && "animate-wiggle"
      } p-8 flex md:w-[450px] flex-col border border-slate-100 rounded-md shadow-md text-slate-600`}
      onSubmit={handleFormSubmission}
    >
      <h2 className="text-2xl md:text-3xl font-medium mb-12 text-slate-800">
        Sign in
      </h2>
      <label htmlFor="login" className="mb-2">
        Login
      </label>
      <input
        type="text"
        id="login"
        name="login"
        placeholder="Admin"
        maxLength={20}
        className={`p-3 rounded-md outline-none focus:outline-slate-300 border border-slate-100 ease-in-out duration-300`}
        value={user.login}
        onChange={handleInputChange}
        autoComplete="off"
      />
      <div className="h-5">
        <p
          className={`${
            !invalidInputs.login && "absolute left-[9999px] opacity-0"
          } flex gap-2 items-center mt-2 text-sm text-red-700 ease-in-out duration-300 opacity-1`}
        >
          <MdOutlineWarningAmber />
          Please enter the login
        </p>
      </div>
      <label htmlFor="password" className="mb-2 mt-8">
        Password
      </label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="********"
        maxLength={50}
        className={`p-3 rounded-md outline-none focus:outline-slate-300 border border-slate-100 ease-in-out duration-300`}
        value={user.password}
        onChange={handleInputChange}
        autoComplete="off"
      />
      <div className="h-5">
        <p
          className={`${
            !invalidInputs.password && "absolute left-[9999px] opacity-0"
          } flex gap-2 items-center mt-2 text-sm text-red-700 ease-in-out duration-300 opacity-1`}
        >
          <MdOutlineWarningAmber />
          Please enter the password
        </p>
      </div>
      <button
        type="submit"
        disabled={isLoading ? true : false}
        className={`w-full h-10 text-xl border-slate-800 rounded-lg bg-slate-700 text-white font-semibold px-5 py-2 flex items-center justify-center  hover:bg-slate-600 duration-700 ease-in-out shadow-md mt-14 cursor-pointer disabled:bg-slate-500 disabled:cursor-not-allowed`}
      >
        {isLoading ? <Spinner /> : "Submit"}
      </button>
      <div className="flex items-center justify-center h-6 mt-5">
        <p
          className={`${
            !error && "absolute left-[9999px] opacity-0"
          } flex gap-2 items-center justify-center text-md text-red-700 ease-in-out duration-300 opacity-1`}
        >
          <MdOutlineWarningAmber />
          {error}
        </p>
      </div>
    </form>
  );
}
