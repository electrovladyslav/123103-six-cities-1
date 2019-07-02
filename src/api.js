import axios from "axios";

import {Pathes} from "./constants";

export const createAPI = () => {
  const api = axios.create({
    baseURL: Pathes.baseURL,
    timeout: 1000 * 5,
    withCredentials: true,
  });

  return api;
};

export default createAPI;
