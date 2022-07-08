import { Axios } from "../../base";

export const createNewUser = (userData: any) => {
    console.log("Inside api file", userData)
    const url = "/user/registernew";
    return Axios.post(url, userData, {
        headers: {
            // Authorization: token
        }
    }).then((response) => {
        console.log(response)
        return response;
    }).catch(err => {
        console.log(err)
        return [];
    })
}