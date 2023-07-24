import { Schema, model, models } from "mongoose";

const SearchResultSchema = new Schema<ISearchResult>(
  {
    name: { required: true, type: String },
    data: { required: true, type: String },
  },
  { timestamps: true }
);

export const SearchResult =
  models.SearchResult ||
  model<ISearchResult>("SearchResult", SearchResultSchema);
