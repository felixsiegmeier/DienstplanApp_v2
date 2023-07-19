import { fetchBody, fetchOptions, baseUrl } from "../database/db";

export async function GET(request) {
  const userGroupId = request.nextUrl.searchParams.get("userGroupId");
  const readData = await fetch(`${baseUrl}/find`, {
    ...fetchOptions,
    body: JSON.stringify({
      ...fetchBody,
      collection: "rosters",
      filter: { userGroupId },
    }),
  });
  const readDataJson = await readData.json();
  return new Response(JSON.stringify(readDataJson.documents));
}

export async function POST(request) {
  const body = await request.json();
  const insertData = await fetch(`${baseUrl}/insertOne`, {
    ...fetchOptions,
    body: JSON.stringify({
      ...fetchBody,
      collection: "rosters",
      document: body,
    }),
  });

  const insertDataJson = await insertData.json();
  return new Response(true);
}

export async function PUT(request) {
  const body = await request.json();
  const data = {};
  data[body.property] = body.value

  const updateData = await fetch(`${baseUrl}/updateOne`, {
    ...fetchOptions,
    body: JSON.stringify({
      ...fetchBody,
      collection: "rosters",
      filter: { _id: { $oid: body.id } },
      update: {
        $set: data,
      },
    }),
  });

  const updateDataJson = await updateData.json();
  return new Response(true);
}

export async function DELETE(request) {
  const body = await request.json();
  const deleteData = await fetch(`${baseUrl}/deleteOne`, {
    ...fetchOptions,
    body: JSON.stringify({
      ...fetchBody,
      collection: "rosters",
      filter: { _id: { $oid: body.id } },
    }),
  });

  const deleteDataJson = await deleteData.json();
  return new Response(true);
}
