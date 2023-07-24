type ResponseError = {
  message: string;
};

type ExternalResponseError = {
  error: string;
};

type ErrorWithMessageAndStatus = {
  status: number;
  message: string;
};

type GenderizeResponseData = {
  count: number;
  name: string;
  gender: string | null;
  probability: number;
  country_id: string;
};

type NationalizeResponseData = {
  count: number;
  name: string;
  country: {
    country_id: string;
    probability: number;
  }[];
};

type NameData = {
  nationalityData: NationalizeResponseData | null;
  genderData: GenderizeResponseData | GenderizeResponseData[] | null;
} | null;

type NameDataContext = {
  nameData: NameData;
  setNameData: Dispatch<SetStateAction<NameData>>;
};

interface ISearchResult {
  name: string;
  data: string;
  createdAt: Date;
}
