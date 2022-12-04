import axios from "axios";

const url = process.env.REACT_APP_BASEURL;

export const api = axios.create({
    baseURL: url,
});
