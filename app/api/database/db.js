export const fetchOptions = {
	method: "POST",
	headers: {
		"Content-Type": "application/json",
		"Access-Control-Request-Headers": "*",
		"api-Key": process.env.MONGODB_DATA_API_KEY
	},
};

export const fetchBody = {
	dataSource: "Cluster0",
	database: "RosterApp",
};

export const baseUrl = `${process.env.MONGODB_DATA_API_URL}/action`;