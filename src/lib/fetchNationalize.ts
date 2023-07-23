export async function fetchNationalize(
    name: string
  ): Promise<NationalizeResponseData> {
    const nationalizeResponse: Response = await fetch(
      `${process.env.NATIONALIZE_URL}?name=${name}`
    );
  
    if (!nationalizeResponse.ok) {
      const { error }: ExternalResponseError = await nationalizeResponse.json();
      const gnError: ErrorWithMessageAndStatus = {
        message: error,
        status: nationalizeResponse.status,
      };
      throw gnError;
    }
  
    const nationalizeData: NationalizeResponseData =
      await nationalizeResponse.json();
    return nationalizeData;
  }
  