import { NextResponse } from "next/server";
import { isErrorWithMessageAndStatus } from "@/utils/isErrorWithMessageAndStatus";
import { fetchGenderize } from "@/lib/fetchGenderize";
import { fetchNationalize } from "@/lib/fetchNationalize";
import { connectMongo } from "@/utils/mongoConfig";
import { SearchResult } from "@/mongo/models/SearchResult";
import { HydratedDocument } from "mongoose";

const NAME_REGEX = /^[a-zA-Z]{1,30}$/;

export async function GET(request: Request) {
  const url: URL = new URL(request.url);
  const searchParams: URLSearchParams = new URLSearchParams(url.search);
  const name: string | null = searchParams.get("value");

  if (!name) {
    return new NextResponse(
      JSON.stringify({ message: "Please provide the name to be investigated" }),
      {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  const validName: boolean = NAME_REGEX.test(name);

  if (!validName) {
    return new NextResponse(
      JSON.stringify({
        message: "The name can consist of 1 to 30 latin characters only",
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
  try {
    await connectMongo();

    const nationalityData: NationalizeResponseData = await fetchNationalize(
      name
    );

    let genderData: GenderizeResponseData[] | GenderizeResponseData;

    if (nationalityData?.country?.length > 0) {
      genderData = await Promise.all(
        nationalityData.country.map((country) =>
          fetchGenderize(name, country.country_id)
        )
      );
    } else {
      genderData = await fetchGenderize(name);
    }

    const nameData: NameData = {
      nationalityData,
      genderData,
    };

    const newSearch: HydratedDocument<ISearchResult> = new SearchResult({
      name,
      data: JSON.stringify(nameData),
    });

    await newSearch.save();

    return new NextResponse(JSON.stringify({ data: nameData }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    console.log(error);
    if (isErrorWithMessageAndStatus(error)) {
      return new NextResponse(
        JSON.stringify({
          message: error.message,
        }),
        {
          status: error.status,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } else
      return new NextResponse(
        JSON.stringify({
          message: "Something went wrong, please try again later",
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  }
}
