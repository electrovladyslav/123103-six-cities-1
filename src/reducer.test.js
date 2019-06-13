import {reducer, ActionTypes} from "./reducer";
import initialState from "./mocks/initial-state";

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(undefined, {})).toEqual(initialState);
});

it(`Reducer play action CHANGE_ACTIVE_CITY correctly`, () => {
  expect(
      reducer(
          {activeCityNumber: 0},
          {
            type: ActionTypes.CHANGE_ACTIVE_CITY,
            payload: 1,
          }
      )
  ).toEqual({activeCityNumber: 1});
});

it(`Reducer play action LOAD_FAIL correctly`, () => {
  expect(
      reducer(
          {loading: ``},
          {
            type: ActionTypes.LOAD_FAIL,
            payload: `Error`,
          }
      )
  ).toEqual({loading: `Error`});
});

it(`Reducer play action REQUIRE_AUTHORIZATION correctly`, () => {
  expect(
      reducer(
          {isAuthorizationRequired: false},
          {
            type: `REQUIRE_AUTHORIZATION`,
            payload: true,
          }
      )
  ).toEqual({isAuthorizationRequired: true});
});

// TODO LOAD_OFFERS:
