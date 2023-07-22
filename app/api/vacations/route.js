import { fetchBody, fetchOptions, baseUrl } from "../database/db";

// Eine GET-Anfrage zum Abrufen von Vacation-Daten basierend auf der userGroupId
export async function GET(request) {
  const userGroupId = request.nextUrl.searchParams.get("userGroupId");

  // Sendet eine Anfrage zum Abrufen von Vacation-Daten aus der Datenbank basierend auf der userGroupId
  const readData = await fetch(`${baseUrl}/find`, {
    ...fetchOptions,
    body: JSON.stringify({
      ...fetchBody,
      collection: "vacations",
      filter: { userGroupId }, // Der Filter verwendet die userGroupId, um spezifische Datensätze abzurufen
    }),
  });

  const readDataJson = await readData.json();
  return new Response(JSON.stringify(readDataJson.documents));
}

// Eine POST-Anfrage zum Hinzufügen eines Vacation-Datensatzes
export async function POST(request) {
  const body = await request.json();

  // Sendet eine Anfrage zum Einfügen des Vacation-Datensatzes in die Datenbank
  const insertData = await fetch(`${baseUrl}/insertOne`, {
    ...fetchOptions,
    body: JSON.stringify({
      ...fetchBody,
      collection: "vacations",
      document: body, // Der Vacation-Datensatz wird im Anfragekörper übermittelt
    }),
  });

  const insertDataJson = await insertData.json();
  return new Response(JSON.stringify(insertDataJson));
}

// Eine DELETE-Anfrage zum Löschen eines Vacation-Datensatzes
export async function DELETE(request) {
  const body = await request.json();

  // Sendet eine Anfrage zum Löschen des Vacation-Datensatzes aus der Datenbank basierend auf der _id
  const deleteData = await fetch(`${baseUrl}/deleteOne`, {
    ...fetchOptions,
    body: JSON.stringify({
      ...fetchBody,
      collection: "vacations",
      filter: { _id: { $oid: body.id } }, // Der Filter verwendet die _id, um den spezifischen Datensatz zu identifizieren
    }),
  });

  const deleteDataJson = await deleteData.json();
  return new Response(true);
}
