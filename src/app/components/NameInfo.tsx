"use client";

import ReactDOMServer from "react-dom/server";
import { useContext, ReactNode, ReactElement } from "react";
import { NameContext } from "../name-provider";
import { convert } from "html-to-text";

const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

export default function NameInfo() {
  const { nameData } = useContext(NameContext);

  const handleCopyRawToClipboard = (nameData: NameData): void => {
    navigator.clipboard.writeText(JSON.stringify(nameData));
  };

  const handleCopyStyledToClipboard = (content: JSX.Element): void => {
    const text = convert(ReactDOMServer.renderToStaticMarkup(content));
    navigator.clipboard.writeText(text);
  };

  let content: JSX.Element;

  if (
    nameData?.genderData &&
    nameData?.nationalityData &&
    Array.isArray(nameData.genderData)
  ) {
    content = (
      <>
        <p className="xl:text-xl text-slate-800 font-light mb-4">
          We have analyzed over {nameData.nationalityData.count} records in
          order to determine the origins of {nameData.nationalityData.name}.
          <br />
          <br />
          This name can be found in countries below:
        </p>

        <ul className="xl:text-xl text-slate-800 font-light ml-4">
          {nameData.nationalityData?.country?.map((country) => {
            const genderDataElem =
              Array.isArray(nameData.genderData) &&
              nameData.genderData.find(
                (data) => data?.country_id === country.country_id
              );

            const genderProbability =
              genderDataElem && (genderDataElem?.probability * 100).toFixed(0);

            return (
              <li className="list-disc mb-2" key={country.country_id}>
                {regionNames.of(country.country_id)} &#40;
                {(country.probability * 100).toFixed(0)}% probability&#41; -
                gender is{" "}
                {(genderDataElem && genderDataElem?.gender) || "unknown"}{" "}
                {genderProbability &&
                  genderProbability !== "0" &&
                  `(${genderProbability}% probability)`}
              </li>
            );
          })}
        </ul>
      </>
    );
    //display different content if no nationalityData or no genderData or genderData is not array, etc.
  } else if (nameData && !nameData?.genderData && !nameData?.nationalityData) {
    content = (
      <p className="xl:text-xl text-slate-800 font-light mb-4">
        No investigation results for that name.
      </p>
    );
  } else {
    content = <></>;
  }

  return (
    <article className={`${!nameData && "absolute left-[9999px]"}`}>
      <h2 className="text-3xl font-semibold mb-4">
        Investigation results for &quot;{nameData?.nationalityData?.name}
        &quot;
      </h2>
      {content}
      <div
        className={`${
          !nameData?.genderData &&
          !nameData?.nationalityData &&
          "absolute left-[9999px]"
        } mt-12 mb-12 flex gap-4`}
      >
        <button
          className="w-fit text-lg rounded-md text-slate-800  px-5 py-1 flex items-center justify-between gap-2 bg-opacity-80 hover:bg-slate-100 duration-700 ease-in-out shadow-md"
          onClick={() => handleCopyRawToClipboard(nameData)}
        >
          Copy raw
        </button>
        <button
          className="w-fit text-lg rounded-md text-slate-800  px-5 py-1 flex items-center justify-between gap-2 bg-opacity-80 hover:bg-slate-100 duration-700 ease-in-out shadow-md"
          onClick={() => handleCopyStyledToClipboard(content)}
        >
          Copy text
        </button>
      </div>
    </article>
  );
}
