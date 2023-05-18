import { fetchBody, fetchOptions, baseUrl } from "../database/db";

export async function GET(request) {
  const readData = await fetch(`${baseUrl}/findOne`, {
    ...fetchOptions,
    body: JSON.stringify({
      ...fetchBody,
      collection: "configs",
      filter: { userGroupId: request.nextUrl.searchParams.get("userGroupId") }
    }),
  });
  const readDataJson = await readData.json();
  return new Response(JSON.stringify(readDataJson.document))
}