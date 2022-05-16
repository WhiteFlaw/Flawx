import axios from 'axios';

const baseURL = 'http://8.130.48.246:3000/'
//const baseURL = "/api";

export const postRequest = axios.create({
    baseURL: baseURL,
    method: 'post',
    timeout: 5000
})

export const getRequest = axios.create({
    baseURL: baseURL,
    method: 'get',
    timeout: 5000
})