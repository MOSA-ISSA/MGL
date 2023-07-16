
const baseUrl = "https://mgl-server.onrender.com"

export const fetchApi = async (route, method, body) => {
    const url = baseUrl + route;
    return await fetch(url, {
        method: method || 'GET',
        headers: {
            'Content-Type': 'application/json', 
        },
        body: body,

    }).then(res => res.json())
    .catch((error) => {
        console.error("fetch Error", error.message);
    });
}

export const checkRespond = async () => {
    const url = "/checkRespond";
    return await fetchApi(url , 'GET' , null)
}

export const test = async () => {
    const url = "/test";
    console.log(" test**");
    const jsonString = JSON.stringify({"ID":"mosa",});
    return await fetchApi(url , 'POST' ,(jsonString))
}






