import { fetchBodyDoctors, fetchOptions, baseUrl } from "../database/db";

export async function GET(request) {
  const readData = await fetch(`${baseUrl}/find`, {
    ...fetchOptions,
    body: JSON.stringify({
      ...fetchBodyDoctors,
      sort: { postedAt: -1 },
    }),
  });
  const readDataJson = await readData.json();
  return new Response(JSON.stringify(readDataJson.documents))
}