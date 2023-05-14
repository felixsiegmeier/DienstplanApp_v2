export const fetchOptions = {
	method: "POST",
	headers: {
		"Content-Type": "application/json",
		"Access-Control-Request-Headers": "*",
		"api-Key": process.env.MONGODB_DATA_API_KEY,
    cache: "no-store"
	},
};

export const fetchBodyDoctors = {
	dataSource: "Cluster0",
	database: "RosterApp",
	collection: "doctors",
	
};

export const baseUrl = `${process.env.MONGODB_DATA_API_URL}/action`;