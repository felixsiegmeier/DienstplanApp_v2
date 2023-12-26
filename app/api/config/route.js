import { fetchBody, fetchOptions, baseUrl } from "../database/db";

export async function GET(request) {
  const readData = await fetch(`${baseUrl}/findOne`, {
    ...fetchOptions,
    body: JSON.stringify({
      ...fetchBody,
      collection: "configs",
      filter: { _id: {$oid: request.nextUrl.searchParams.get("_id")} }
    }),
  });
  const readDataJson = await readData.json();
  return new Response(JSON.stringify(readDataJson.document))
}

export async function PUT(request) {
  const body = await request.json();
  const data = {}
  data[body.property] = body.value
  const updateData = await fetch(`${baseUrl}/updateOne`, {
    ...fetchOptions,
    body: JSON.stringify({
      ...fetchBody,
      collection: "configs",
      filter: {_id: {$oid: body.id}},
      update:{
        $set: data
      }
    })
    })

  const updateDataJson = await updateData.json();
  return new Response(true);
}