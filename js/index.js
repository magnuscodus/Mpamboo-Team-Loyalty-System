function GetAccessToken() {
	const data = axios({
		method: "GET",
		client_id: process.env.TROVO_CLIENT_ID,
		url: "https%3A%2F%2Fopen.trovo.live/page/login.html",
		redirect_uri: "https%3A%2F%2Ftrovo.live",
		response_type: "token",
		scope: "user_details_self",
	});

	const response = await axios({
		url: data.url,
		method: "POST",
		headers: {"content-type": "application/json"},
		data: JSON.stringify(data),
	});

	console.log(data);
	return response.data;
}

document.getElementById("loginBtn").addEventListener("click", GetAccessToken);
