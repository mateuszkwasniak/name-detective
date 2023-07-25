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

type Auth = {
  name: string;
};

type AuthContext = {
  auth: Auth;
  setAuth: Dispatch<SetStateAction<Auth>>;
};

type UserLoginData = {
  login: string;
  password: string;
};

type ValidLoginInputs = {
  login: boolean;
  password: boolean;
};

type LoginResponseData = {
  message: string;
  name: string;
};

type Token = {
  name: string;
};

interface ISearchResult {
  name: string;
  data: string;
  createdAt: Date;
}

interface IUser {
  login: string;
  password: string;
  name: string;
}
