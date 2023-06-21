import axios from "axios";

// const accessToken = JSON.parse(localStorage.getItem('token'))
const APIapp=axios.create({
    baseURL: "http://localhost:8080/",
    headers: { 
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${accessToken}` 
    }
})

APIapp.interceptors.request.use((config)=>{
    // config.headers.Authorization = `Bearer ${accessToken}`;
    return config
})

export default APIapp
