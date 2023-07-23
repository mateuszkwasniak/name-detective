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
};

type NationalizeResponseData = {
  count: number;
  name: string;
  country: {
    country_id: string;
    probability: number;
  }[];
};
