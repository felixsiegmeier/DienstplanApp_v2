const fetchOptions = {
	method: "POST",
	headers: {
		"Content-Type": "application/json",
		"Access-Control-Request-Headers": "*",
		"api-Key": process.env.MONGODB_DATA_API_KEY
	},
};

const fetchBody = {
	dataSource: "Cluster0",
	database: "social_butterfly",
	collection: "flutters"
};

const baseUrl = `${process.env.MONGODB_DATA_API_URL}/action`;

export async function GET(request) {
  console.log("got called")
  const readData = await fetch(`${baseUrl}/find`, {
    ...fetchOptions,
    body: JSON.stringify({
      ...fetchBody,
      sort: { postedAt: -1 },
    }),
  });
  const readDataJson = await readData.json();
  
  console.log(readDataJson.documents)
  return new Response('Hello, Next.js!')
}
