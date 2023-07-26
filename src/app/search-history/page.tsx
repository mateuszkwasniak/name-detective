import { HydratedDocument } from "mongoose";
import { Suspense } from "react";
import SearchList from "./components/SearchList";
import Spinner from "../components/Spinner";
import { getSearchHistory } from "@/lib/getSearchHistory";

export const revalidate = 0;

export const metadata = {
  title: "Search History",
  description: "Browse the history of investigated names",
};

export default async function SearchHistoryPage() {
  const searchResultsPromise: Promise<HydratedDocument<ISearchResult>[]> =
    getSearchHistory();

  return (
    <main className="w-[90%] xl:w-[70rem] mt-[12rem] flex-grow">
      <h1 className="text-3xl md:text-4xl text-center font-semibold mb-16 text-slate-800">
        Investigations History
      </h1>
      <Suspense fallback={<Spinner dark={true} />}>
        <SearchList searchResultsPromise={searchResultsPromise} />
      </Suspense>
    </main>
  );
}
