import axios from 'axios';

export const client = axios.create({
    baseURL: 'http://localhost:5000/todos',
    headers: {
        'Content-Type': 'application/json',
        Authorization: '16146997-b6f4-41bd-8ff6-66fb3b245ada',
    },
});
