import { fetchApi } from "./API";

export const getAllGamesName = async () => {
    const url = "/getAllGamesName";
    return await fetchApi(url , 'GET' , null)
}

export const getAllGamesData = async () => {
    const url = "/getAllGamesData";
    return await fetchApi(url , 'GET' , null)
}

export const getGamesDataROWG = async () => {
    try{
    const url = "https://api.rawg.io/api/games?key=7507789e93524533820c1382fd9b7c69&page=1&page_size=40"
    return await fetch(url ,
        {
            method:'GET',
            body: null,
        }
    ).then(res => res.json())

    }catch(e){
        console.error("e");
    }
}

export const getGameByName = async (gameName) => {
    const url = "/getGameByName";
    const jsonString = JSON.stringify(gameName);
    try {
      const response = await fetchApi(url, 'POST', jsonString);
      return response;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};