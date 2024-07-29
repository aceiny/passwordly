import axios from "axios";

export const api = axios.create({
    validateStatus: function (status) {
        return status == 200 || status == 201;
      },
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials : true
})