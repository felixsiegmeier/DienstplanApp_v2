import { fetchBody, fetchOptions, baseUrl } from "../database/db";
import { doctorModel } from "../database/models";
import bcrypt from "bcryptjs";

export async function GET(request) {
  // console.log(request.nextUrl.searchParams);
  const readData = await fetch(`${baseUrl}/find`, {
    ...fetchOptions,
    body: JSON.stringify({
      ...fetchBody,
      collection: "doctors",
      filter: { userGroupId: request.nextUrl.searchParams.get("userGroupId") },
    }),
  });
  const readDataJson = await readData.json();
  const doctors = readDataJson.documents;
  for (const doctor of doctors) {
    delete doctor["userAccount"];
    delete doctor["password"];
  }
  return new Response(JSON.stringify(doctors));
}

export async function POST(request) {
  const body = await request.json();
  const doctorName = body.doctorName;
  const normalizedDoctorName = body.doctorName
    .toLowerCase()
    .replace(/\s/g, "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  const insertData = await fetch(`${baseUrl}/insertOne`, {
    ...fetchOptions,
    body: JSON.stringify({
      ...fetchBody,
      collection: "doctors",
      document: {
        ...doctorModel,
        name: doctorName,
        password: bcrypt.hashSync(normalizedDoctorName, 10),
        alias: normalizedDoctorName,
        userGroupId: body.userGroupId,
      },
    }),
  });

  const insertDataJson = await insertData.json();
  return new Response(true);
}

export async function PUT(request) {
  const body = await request.json();
  const data = {}
  if(body.property === "password"){
    data[body.property] = bcrypt.hashSync(body.value, 10)
  } else {
    data[body.property] = body.value
  }
  const updateData = await fetch(`${baseUrl}/updateOne`, {
    ...fetchOptions,
    body: JSON.stringify({
      ...fetchBody,
      collection: "doctors",
      filter: {_id: {$oid: body.id}},
      update:{
        $set: data
      }
    })
    })

  const updateDataJson = await updateData.json();
  return new Response(true);
}

export async function DELETE(request) {
  const body = await request.json();
  const deleteData = await fetch(`${baseUrl}/deleteOne`, {
    ...fetchOptions,
    body: JSON.stringify({
      ...fetchBody,
      collection: "doctors",
      filter: {_id: {$oid: body.id}}
    })
    })

  const deleteDataJson = await deleteData.json();
  return new Response(true);
}