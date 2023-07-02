
const baseUrl = "https://mgl-server.onrender.com"

const fetchApi = async (route, method, body) => {
    const url = baseUrl + route;
    return await fetch(url, {
        method: method || 'GET',
        body: body
    }).then(res => res.json())
    .catch((error) => {
        console.error("Error", error.message);
    });
}

export const checkRespond = async () => {
    const url = "/checkRespond";
    return await fetchApi(url , 'GET' , null)
}

export const getAllGames = async () => {
    const url = "/getAllGames";
    return await fetchApi(url , 'GET' , null)
}

export const creatNewUser = async (user) => {
    const url = "/creatNewUser";
    return await fetchApi(url , 'POST' , user)
}


