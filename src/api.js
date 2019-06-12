import axios from "axios";

import {ActionCreator, LoadingTypes} from "./reducer";

export const createAPI = (dispatch) => {
  const api = axios.create({
    baseURL: `https://es31-server.appspot.com/six-cities`,
    timeout: 1000 * 5,
    withCredentials: true,
  });

  const onSuccess = (response) => {
    dispatch(ActionCreator.endLoading(LoadingTypes.END_LOADING));
    return response;
  };

  const onFail = (err) => {
    if (err.response === undefined) {
      dispatch(ActionCreator.loadFail(err.message));
      return Promise.reject(err);
    }

    if (err.response.status === 403) {
      dispatch(ActionCreator.requireAuthorization(true));
    }

    return err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};

export default createAPI;
