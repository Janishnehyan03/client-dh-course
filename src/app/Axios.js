import axios from "axios";
import Cookies from "js-cookie";

const Axios = axios.create({
  // baseURL: "https://course.cpetdhiu.in/api/v1",
  baseURL: "http://192.168.1.97:5000/api/v1",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "*",
    Authorization: `Bearer ${Cookies.get("token")}`,
  },
  withCredentials: true,
});

export default Axios;
