import {reducer} from "./reducer";
import initialState from "./mocks/initial-state";

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(undefined, {})).toEqual(initialState);
});

it(`Reducer should change city correctly`, () => {
  expect(
      reducer(
          {
            city: {
              name: `Amsterdam`,
              coordinates: [52.38333, 4.9],
            },
            offers: [
              {
                coordinates: [1, 1],
              },
              {
                coordinates: [2, 2],
              },
            ],
          },
          {
            type: `CHANGE_CITY`,
            payload: {
              name: `Melbourne`,
              coordinates: [-37.840935, 144.946457],
            },
          }
      )
  ).toEqual({
    city: {
      name: `Melbourne`,
      coordinates: [-37.840935, 144.946457],
    },
    offers: [
      {
        coordinates: [1, 1],
      },
      {
        coordinates: [2, 2],
      },
    ],
  });
});

it(`Reducer should get offers correctly`, () => {
  expect(
      reducer(
          {
            city: {
              name: `Amsterdam`,
              coordinates: [52.38333, 4.9],
            },
            offers: [
              {
                coordinates: [1, 1],
              },
              {
                coordinates: [2, 2],
              },
            ],
          },
          {
            type: `GET_OFFERS`,
            payload: [
              {
                coordinates: [3, 3],
              },
              {
                coordinates: [4, 4],
              },
            ],
          }
      )
  ).toEqual({
    city: {
      name: `Amsterdam`,
      coordinates: [52.38333, 4.9],
    },
    offers: [
      {
        coordinates: [3, 3],
      },
      {
        coordinates: [4, 4],
      },
    ],
  });
});

