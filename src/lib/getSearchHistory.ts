import { SearchResult } from "@/mongo/models/SearchResult";
import { connectMongo } from "@/utils/mongoConfig";
import { HydratedDocument } from "mongoose";

export async function getSearchHistory(): Promise<
  HydratedDocument<ISearchResult>[]
> {
  await connectMongo();
  const searchHistory = await SearchResult.find().sort({ createdAt: -1 });
  return searchHistory;
}
