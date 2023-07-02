
const baseUrl = "https://mgl-server.onrender.com"

const fetchApi = async (route, method, body) => {
    const url = baseUrl + route;
    return await fetch(url, {
        method: method || 'GET',
        body: body
    }).then(res => res.json())
}

export const getAllGames = async () => {
    const url = "/getAllGames";
    return await fetchApi(url , 'GET' , null)
}


