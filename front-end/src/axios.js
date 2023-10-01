import axios from 'axios'

export const localAxios = axios.create({
    baseURL: 'http://localhost:3000',
  });
  
  export const remoteAxios = axios.create({
    baseURL: 'https://personalised-task-manager-api.vercel.app/',
  });
  
