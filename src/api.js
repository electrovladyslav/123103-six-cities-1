import axios from "axios";

import {BASE_URL as baseURL} from "./constants";

export const createAPI = () => {
  const api = axios.create({
    baseURL,
    timeout: 1000 * 5,
    withCredentials: true,
  });

  return api;
};

export default createAPI;
