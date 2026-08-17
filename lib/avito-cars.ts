import { getAvitoToken } from "./avito";

export async function getAvitoCars() {
  const token = await getAvitoToken();

  const response = await fetch(
    "https://api.avito.ru/core/v1/items?per_page=100&page=1;",
    {
      headers: {
        Authorization: `Bearer ${token.access_token}`,
        Accept: "application/json",
      },
      next: {
        revalidate: 60,
      },
    }
  );

  if (!response.ok) {
    const errorText = await response.text();

    console.error("AVITO ERROR STATUS:", response.status);
    console.error("AVITO ERROR BODY:", errorText);

    throw new Error(
      `Avito API error: ${response.status} ${response.statusText} - ${errorText}`
    );
  }

  const data = await response.json();

  console.log(
    "AVITO ITEMS:",
    data.resources?.length ?? 0
  );

  return data;
}