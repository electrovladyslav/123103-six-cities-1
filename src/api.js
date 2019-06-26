import axios from "axios";

import {ActionCreator, LoadingTypes} from "./reducer";

export const baseURL = `https://es31-server.appspot.com/six-cities`;

export const createAPI = (dispatch) => {
  const api = axios.create({
    baseURL,
    timeout: 1000 * 5,
    withCredentials: true,
  });

  const onSuccess = (response) => {
    dispatch(ActionCreator.endLoading(LoadingTypes.END_LOADING));
    return response;
  };

  const onFail = (err) => {
    if (err.response === undefined) {
      dispatch(ActionCreator.loadFail(LoadingTypes.LOAD_FAIL));
      return Promise.reject(err);
    }

    if (err.response.status === 403) {
      history.pushState(null, null, `/login`);
      // dispatch(ActionCreator.requireAuthorization(true));
    }

    return err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};

export default createAPI;
