import axios from 'axios';

const axiosInstanc = axios.create({
  baseURL: import.meta.env.PROD
    ? "https://pay-timer.onrender.com/api/v1"
    : "/abc",
  withCredentials: true,
});




export default axiosInstanc;
