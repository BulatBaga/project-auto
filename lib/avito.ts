const AVITO_URL = "https://api.avito.ru/token";;

export async function getAvitoToken() {
  const clientId = process.env.AVITO_CLIENT_ID;
  const clientSecret = process.env.AVITO_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error(
      "Не настроены AVITO_CLIENT_ID или AVITO_CLIENT_SECRET"
    );
  }

  const response = await fetch(AVITO_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: clientId,
      client_secret: clientSecret,
    }),
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("AVITO TOKEN ERROR:", response.status, data);

    throw new Error(
      `Avito token error: ${response.status} ${
        response.statusText
      }`
    );
  }

  return data;
}