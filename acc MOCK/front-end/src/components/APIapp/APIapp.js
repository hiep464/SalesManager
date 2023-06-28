import axios from "axios";
import { getCookie } from "../../utils/api";

// const accessToken = JSON.parse(localStorage.getItem('token'))
const APIapp=axios.create({
    baseURL: "http://localhost:8080/",
    headers: {
        // token: Cookies.get('token'),
        Authorization: getCookie('Authorization'),
    },
})


// APIapp.interceptors.request.use((config)=>{
//     config.headers.Authorization = `Bearer ${accessToken}`;
//     return config
// })

export default APIapp
