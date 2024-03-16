import axios from "axios";
import Cookies from "js-cookie";

const host = "https://localhost:8443";


function tokenExpired() {
    const timestamp = Cookies.get("tokenTimestamp");
    if (!timestamp) {
        return true;
    }
    const currentTimestamp = Date.now();
    const differenceInMinutes = (currentTimestamp - timestamp) / (1000 * 60);

    // OFbiz expires token in every 30 minutes 
    return differenceInMinutes > 29;
}



export async function getToken() {

    if (!tokenExpired) {
        return Cookies.get("token");
    }
    
    const username = 'admin';
    const password = 'ofbiz';
    
    let token = 'processing';
    
    try {
        console.log("Getting new token!!");
        const response = await axios.post(`${host}/rest/auth/token`, {}, {
            auth: {
                username: username,
                password: password
            }
        });

        token = response.data.data.access_token;
    } catch (error) {
        console.error('Error:', error);
    }
    
    
    console.log("Got token: " + token);
    Cookies.set("tokenTimestamp", Date.now());
    Cookies.set("token", token);
    return token;
}

export async function doGet(endpoint) {

    const token = await getToken();  // This will get JWT token from OFbiz or from browser Cookies

    console.log("Token using: " + token);
    try {
        console.log("Performing doGet()")
        const response = await axios.get(`${host}/${endpoint}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response);
        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export function doPost() { }
