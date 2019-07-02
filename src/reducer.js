import initialState from "./mocks/initial-state";
import adapter from "./adapter";

export const ActionTypes = {
  LOAD_OFFERS: `LOAD_OFFERS`,
  LOAD_REVIEWS: `LOAD_REVIEWS`,
  START_LOADING: `START_LOADING`,
  END_LOADING: `END_LOADING`,
  LOAD_FAIL: `LOAD_FAIL`,
  CHANGE_ACTIVE_CITY: `CHANGE_ACTIVE_CITY`,
  REQUIRE_AUTHORIZATION: `REQUIRE_AUTHORIZATION`,
  AUTHORIZE: `AUTHORIZE`,
};

export const LoadingTypes = {
  START_LOADING: `START_LOADING`,
  END_LOADING: `END_LOADING`,
  LOAD_FAIL: `LOAD_FAIL`,
};

export const ActionCreator = {
  requireAuthorization: (status) => {
    return {
      type: ActionTypes.REQUIRE_AUTHORIZATION,
      payload: status,
    };
  },

  authorize: (data) => {
    return {
      type: ActionTypes.AUTHORIZE,
      payload: data,
    };
  },

  loadOffers: (offers) => {
    return {
      type: ActionTypes.LOAD_OFFERS,
      payload: offers,
    };
  },

  loadReviews: (reviews) => {
    return {
      type: ActionTypes.LOAD_REVIEWS,
      payload: reviews,
    };
  },

  startLoading: (message) => {
    return {
      type: ActionTypes.START_LOADING,
      payload: message,
    };
  },

  endLoading: (message) => {
    return {
      type: ActionTypes.END_LOADING,
      payload: message,
    };
  },

  loadFail: (message) => {
    return {
      type: ActionTypes.LOAD_FAIL,
      payload: message,
    };
  },

  changeActiveCity: (cityNumber) => ({
    type: ActionTypes.CHANGE_ACTIVE_CITY,
    payload: cityNumber,
  }),
};

export const Operation = {
  loadOffers: () => (dispatch, _getState, api) => {
    return api
      .get(`/hotels`)
      .then((response) => {
        dispatch(ActionCreator.loadOffers(adapter(response.data)));
      })
      .then((response) => {
        dispatch(ActionCreator.endLoading(LoadingTypes.END_LOADING));
        return response;
      })
      .catch((err) => {
        dispatch(ActionCreator.loadFail(LoadingTypes.LOAD_FAIL));
        return Promise.reject(err);
      });
  },

  authorize: (data) => (dispatch, _getState, api) => {
    return (
      api
        .post(`/login`, data)
        .then((response) => {
          dispatch(ActionCreator.authorize(response.data));
          dispatch(ActionCreator.requireAuthorization(false));
        })
        // eslint-disable-next-line no-console
        .catch((err) => console.log(err))
    );
  },

  getAuthorization: () => (dispatch, _getState, api) => {
    return (
      api
        .get(`/login`)
        .then((response) => {
          dispatch(ActionCreator.authorize(response.data));
          dispatch(ActionCreator.requireAuthorization(false));
        })
        // eslint-disable-next-line no-console
        .catch(() => console.log(`Not logged`))
    );
  },

  loadReviews: (offerId) => (dispatch, _getState, api) => {
    return (
      api
        .get(`/comments/${offerId}`)
        .then((response) => {
          dispatch(ActionCreator.loadReviews(response.data));
        })
        // eslint-disable-next-line no-console
        .catch((err) => console.log(err))
    );
  },

  sendReviews: (offerId, review) => (dispatch, _getState, api) => {
    return (
      api
        .post(`/comments/${offerId}`, review)
        .then((response) => {
          dispatch(ActionCreator.loadReviews(response.data));
        })
        // eslint-disable-next-line no-console
        .catch((err) => console.log(err))
    );
  },

  postToFavorites: (status, offerId) => (dispatch, _getState, api) => {
    return (
      api
        .post(`/favorite/${offerId}/${status}`)
        .then((response) => {
          Promise.resolve(response.data);
        })
        // eslint-disable-next-line no-console
        .catch((err) => console.log(err))
    );
  },
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.CHANGE_ACTIVE_CITY:
      return Object.assign({}, state, {
        activeCityNumber: action.payload,
      });

    case ActionTypes.LOAD_OFFERS:
      return Object.assign({}, state, {
        allOffers: action.payload,
      });

    case ActionTypes.LOAD_REVIEWS:
      return Object.assign({}, state, {
        reviews: action.payload,
      });

    case ActionTypes.START_LOADING:
      return Object.assign({}, state, {
        loading: action.payload,
      });

    case ActionTypes.END_LOADING:
      return Object.assign({}, state, {
        loading: action.payload,
      });

    case ActionTypes.LOAD_FAIL:
      return Object.assign({}, state, {
        loading: action.payload,
      });

    case ActionTypes.REQUIRE_AUTHORIZATION:
      return Object.assign({}, state, {
        isAuthorizationRequired: action.payload,
      });

    case ActionTypes.AUTHORIZE:
      return Object.assign({}, state, {
        user: action.payload,
      });
  }

  return state;
}
