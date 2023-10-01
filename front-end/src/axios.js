import axios from 'axios'

export default axios.create({
     baseURL: 'https://personalised-task-manager-api.vercel.app' 
    // baseURL: 'http://localhost:3000' 
});
