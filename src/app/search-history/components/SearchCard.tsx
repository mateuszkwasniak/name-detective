import { HydratedDocument } from "mongoose";
import { BsGenderAmbiguous } from 'react-icons/bs';
import { MdOutlineFlagCircle } from 'react-icons/md'

type Props = {
  searchResult: HydratedDocument<ISearchResult>;
};

export default function SearchCard({ searchResult }: Props) {

  const parsedNameData: NameData = JSON.parse(searchResult.data);

  let formattedGenderDataText: string = "", formattedNationalityDataText: string = "";

  if(parsedNameData?.genderData) {
    formattedGenderDataText = JSON.stringify(parsedNameData.genderData, null, 2)
  }

  if(parsedNameData?.nationalityData) {
    formattedNationalityDataText = JSON.stringify(parsedNameData.nationalityData, null, 2)
  }


  return (
    <article className="w-full md:w-fit h-fit border border-slate-50 rounded-md shadow-md p-4 md:p-16 flex flex-col md:flex-row gap-10 md:gap-20 justify-center text-slate-800">
    <div className="flex flex-col">
      <h3 className="text-lg md:text-xl font-semibold mb-2">Date:</h3>
      <p className="md:text-xl">
        {searchResult.createdAt.toLocaleDateString()} at{" "}
        {searchResult.createdAt.toLocaleTimeString()}{" "}
      </p>
      <hr className="h-0 w-full border border-t-0 border-slate-200 my-10"/>
      <h3 className="text-lg md:text-xl font-semibold mb-2">Name:</h3>
      <p className="md:text-xl mb-5">{searchResult.name}</p>
    </div>
    <hr className="h-0 md:h-[25rem] border border-t-0 md:border-l-0 border-slate-200"/>
    <div className="flex flex-col">
      <h3 className="text-lg md:text-xl font-semibold mb-8">Results:</h3>
      <div className="flex flex-col md:flex-row gap-16">
        {formattedNationalityDataText && <div><h4 className="font-medium text-lg mb-2 flex gap-2"><MdOutlineFlagCircle /> Nationality</h4><pre>{formattedNationalityDataText}</pre></div>}
        {formattedGenderDataText && <div><h4 className="font-medium text-lg mb-2 flex gap-2"><BsGenderAmbiguous/> Gender</h4><pre>{formattedGenderDataText}</pre></div>}
      </div>
    </div>
    </article>
  );
}
