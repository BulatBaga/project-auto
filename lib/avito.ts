const AVITO_URL = "https://api.avito.ru/token";

export async function getAvitoToken() {
  const response = await fetch(AVITO_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: process.env.AVITO_CLIENT_ID!,
      client_secret: process.env.AVITO_CLIENT_SECRET!,
    }),
  });

  const data = await response.json();

  console.log("AVITO TOKEN:", data);

  if (!response.ok) {
    throw new Error(JSON.stringify(data));
  }

  return data;
}