import { fetchApi } from "./API";

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
        console.log(error.message);
        throw error;
    }
};

export const deleteUserByID = async (ID) => {
    const url = "/deleteUserByID";
    const jsonString = JSON.stringify(ID);
    try {
      const response = await fetchApi(url, 'DELETE', jsonString);
      return response;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};

export const updateUserByID = async (ID,update) => {
    const url = "/updateUserByID";
    const req = {
        "userID":ID,
        "updatedUser":{...update}
    }
    const jsonString = JSON.stringify(req);
    try {
      const response = await fetchApi(url, 'PUT', jsonString);
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

export const canCreat =(ID)=>isUserExist(ID).then((res)=>{
    console.log(!res.message);
    // setCanCreatUser(!res.message)
    return !res.message
})

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