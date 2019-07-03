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

it(`Reducer play action LOAD_OFFERS correctly`, () => {
  expect(
      reducer(
          {allOffers: []},
          {
            type: `LOAD_OFFERS`,
            payload: [{name: `Amsterdam`}, {name: `Moscow`}],
          }
      )
  ).toEqual({allOffers: [{name: `Amsterdam`}, {name: `Moscow`}]});
});

it(`Reducer play action LOAD_REVIEWS correctly`, () => {
  expect(
      reducer(
          {reviews: []},
          {
            type: `LOAD_REVIEWS`,
            payload: [{comment: `comment1`}, {comment: `comment2`}],
          }
      )
  ).toEqual({reviews: [{comment: `comment1`}, {comment: `comment2`}]});
});

it(`Reducer play action START_LOADING correctly`, () => {
  expect(
      reducer(
          {loading: ``},
          {
            type: ActionTypes.START_LOADING,
            payload: `Start`,
          }
      )
  ).toEqual({loading: `Start`});
});

it(`Reducer play action END_LOADING correctly`, () => {
  expect(
      reducer(
          {loading: ``},
          {
            type: ActionTypes.END_LOADING,
            payload: `End`,
          }
      )
  ).toEqual({loading: `End`});
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

it(`Reducer play action AUTHORIZE correctly`, () => {
  expect(
      reducer(
          {user: {}},
          {
            type: `AUTHORIZE`,
            payload: {name: `Adolf`, email: `zig@hail.de`},
          }
      )
  ).toEqual({user: {name: `Adolf`, email: `zig@hail.de`}});
});
