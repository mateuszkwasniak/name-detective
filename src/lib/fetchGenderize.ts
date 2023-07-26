export async function fetchGenderize(
  name: string,
  country?: string
): Promise<GenderizeResponseData> {
  const genderizeResponse: Response = await fetch(
    `${process.env.GENDERIZE_URL}?name=${name}${
      country ? `&country_id=${country}` : ""
    }`
  );

  if (!genderizeResponse.ok) {
    const { error }: ExternalResponseError = await genderizeResponse.json();
    const gnError: ErrorWithMessageAndStatus = {
      message: error,
      status: genderizeResponse.status,
    };
    throw gnError;
  }

  const genderizeData: GenderizeResponseData = await genderizeResponse.json();
  return genderizeData;
}
