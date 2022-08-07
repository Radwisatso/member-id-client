import axios from "axios";

const url = "http://localhost:3000"

const Axios = axios.create({
    baseURL: url
})  


export default Axios