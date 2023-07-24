"use client";

import { ChangeEvent, FormEvent } from "react";
import { useState, useEffect, useContext } from "react";
import { MdOutlineWarningAmber } from "react-icons/md";
import Spinner from "@/app/components/Spinner";
import { NameContext } from "../name-provider";

const NAME_REGEX = /^[a-zA-Z]{1,30}$/;

export default function NameSearchForm() {
  const [name, setName] = useState<string>("");
  const [nameInputFocus, setNameInputFocus] = useState<boolean>(false);
  const [validNameInput, setValidNameInput] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const { setNameData } = useContext(NameContext);

  const handleNameInputChange: (e: ChangeEvent<HTMLInputElement>) => void = (
    e
  ) => setName(e.target.value);

  const handleFormSubmission: (e: FormEvent<HTMLFormElement>) => void = async (
    e
  ) => {
    e.preventDefault();
    setValidNameInput(true);
    setError("");

    const validName = NAME_REGEX.test(name);

    if (!validName) {
      return;
    }

    setIsLoading(true);

    try {
      const response: Response = await fetch(`/api/name?value=${name}`);

      if (!response.ok) {
        const error: ResponseError = await response.json();
        setError(error.message);
        return;
      }
      const { data } = await response.json();

      setNameData(data);
      setName("");
    } catch (error) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const valid = NAME_REGEX.test(name);
    setValidNameInput(valid);
  }, [name]);

  return (
    <form
      className="p-8 flex w-full flex-col border border-slate-100 rounded-md shadow-md"
      onSubmit={handleFormSubmission}
    >
      <label
        htmlFor="name"
        className="xl:text-3xl font-medium text-slate-600 mb-6"
      >
        Enter a name
      </label>
      <input
        required
        type="text"
        id="name"
        name="name"
        placeholder="John"
        maxLength={30}
        className={`${
          !validNameInput && name && "outline-red-600"
        } p-3 rounded-md outline-none focus:outline-slate-300 border border-slate-100 ease-in-out duration-300`}
        value={name}
        onChange={handleNameInputChange}
        onFocus={() => setNameInputFocus(true)}
        onBlur={() => setNameInputFocus(false)}
        autoComplete="off"
      />
      <div className="h-5">
        <p
          className={`${
            ((!validNameInput && nameInputFocus) || validNameInput || !name) &&
            "absolute left-[-9999px] opacity-0"
          } flex gap-2 items-center mt-4 text-sm text-red-700 ease-in-out duration-300 opacity-1`}
        >
          <MdOutlineWarningAmber /> Please enter a name using correct format
        </p>
        <p
          className={`${
            !nameInputFocus && "absolute left-[-9999px] opacity-0"
          } flex gap-2 items-center mt-2 text-sm text-slate-600 ease-in-out duration-300 opacity-1`}
        >
          1 to 30 characters, using latin alphabet.
        </p>
      </div>
      <button
        type="submit"
        disabled={!validNameInput || isLoading ? true : false}
        className="w-full h-10 text-xl border-slate-800 rounded-lg bg-slate-800 text-white font-semibold px-5 py-2 flex items-center justify-center  hover:bg-slate-600 duration-700 ease-in-out shadow-md mt-14 cursor-pointer disabled:bg-slate-400 disabled:cursor-not-allowed"
      >
        {isLoading ? <Spinner /> : "Investigate"}
      </button>
      <div className="flex items-center justify-center h-2 mt-5">
        <p
          className={`${
            !error && "absolute left-[-9999px] opacity-0"
          } flex gap-2 items-center justify-center mt-5 text-md text-red-700 ease-in-out duration-300 opacity-1`}
        >
          <MdOutlineWarningAmber /> {error}
        </p>
      </div>
    </form>
  );
}
