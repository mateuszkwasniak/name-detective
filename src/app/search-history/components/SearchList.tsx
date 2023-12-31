import { HydratedDocument } from "mongoose";
import React from "react";
import SearchCard from "./SearchCard";
import ScrollTopButton from "./ScrollTopButton";

type Props = {
  searchResultsPromise: Promise<HydratedDocument<ISearchResult>[]>;
};

export default async function SearchList({ searchResultsPromise }: Props) {
  let content: JSX.Element;

  try {
    const searchHistory = await searchResultsPromise;

    if (searchHistory?.length === 0) {
      content = (
        <p className="md:text-xl text-center text-slate-800">
          No name was investigated yet.
        </p>
      );
    } else {
      content = (
        <>
          <ul className="flex flex-col items-center gap-12">
            {searchHistory?.map((searchResult) => (
              <SearchCard
                searchResult={searchResult}
                key={searchResult._id.toString()}
              />
            ))}
          </ul>
          <ScrollTopButton />
        </>
      );
    }
  } catch (error) {
    content = (
      <p>
        Name investigations history is not available at the moment, please try
        again later.
      </p>
    );
  }

  return <div>{content}</div>;
}
