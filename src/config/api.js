import axios from "axios";

export const API_BASE_URL = "https://blackhole-server.onrender.com";

const jwtToken = localStorage.getItem("jwt")

export const api = axios.create({baseURL:API_BASE_URL,
    headers:{
        "Authorization":`Bearer ${jwtToken}`,
    }
})