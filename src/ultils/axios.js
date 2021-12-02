import axios from 'axios';
import { serviceUrl } from './config';

const service = axios.create({
    baseURL: serviceUrl
})

export { service }