
const baseUrl = "https://mgl-server.onrender.com"

const fetchApi = async (route, method, body) => {
    const url = baseUrl + route;
    return await fetch(url, {
        method: method || 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        body: body,

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
    // console.log(user);
    // const jsonString = JSON.stringify(user);
    return await fetchApi(url , 'POST' , user)
}

export const getUserByID = async (ID) => {
    const url = "/getUserByID";
    const jsonString = JSON.stringify(ID);
    try {
      const response = await fetchApi(url, 'POST', jsonString);
      return response;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
  
export const isUserExist = async (ID) => {
    const url = "/isUserExist";
    const jsonString = JSON.stringify(ID);
    try {
        const response = await fetchApi(url, 'POST', jsonString);
        return response;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}

export const creatUser = async () => {
    const url = "/creatNewUser";
    console.log(" creatNewUser**");
    const jsonString = JSON.stringify({
        ID:"mosa",
        mail:"m@m.mm",
        password:"123123123",
        name:"mm"
    });
    return await fetchApi(url , 'POST' ,jsonString)
}

export const test = async () => {
    const url = "/test";
    console.log(" test**");
    const jsonString = JSON.stringify({"ID":"mosa",});
    return await fetchApi(url , 'POST' ,(jsonString))
}






