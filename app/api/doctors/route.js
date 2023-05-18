import { fetchBody, fetchOptions, baseUrl } from "../database/db";

export async function GET(request) {
  console.log(request.nextUrl.searchParams)
  const readData = await fetch(`${baseUrl}/find`, {
    ...fetchOptions,
    body: JSON.stringify({
      ...fetchBody,
      collection: "doctors",
      filter: { userGroupId: request.nextUrl.searchParams.get("userGroupId") }
    }),
  });
  const readDataJson = await readData.json();
  return new Response(JSON.stringify(readDataJson.documents))
}