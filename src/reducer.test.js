import {reducer, filterOffersByCity, Operation} from "./reducer";
import MockAdapter from "axios-mock-adapter";
import api from "./api";
import adapter from "./adapter";
import initialState from "./mocks/initial-state";

it(`Offers filter correctly`, () => {
  const mockCities = [
    {
      city: {
        name: `Amsterdam`,
      },
    },
    {
      city: {
        name: `Moscow`,
      },
    },
    {
      city: {
        name: `Amsterdam`,
      },
    },
    {
      city: {
        name: `New York`,
      },
    },
  ];

  expect(filterOffersByCity(mockCities, {name: `Amsterdam`})).toEqual([
    {city: {name: `Amsterdam`}},
    {city: {name: `Amsterdam`}},
  ]);

  expect(filterOffersByCity(mockCities, {name: `Moscow`})).toEqual([
    {city: {name: `Moscow`}},
  ]);


  expect(filterOffersByCity(mockCities, {name: `Barselona`})).toEqual([]);
});

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

it(`Should make a correct API call to /hotels`, function () {
  const apiMock = new MockAdapter(api);
  const dispatch = jest.fn();
  const questionLoader = Operation.loadOffers();

  apiMock
    .onGet(`/hotels`)
    .reply(200, [{fake: true}]);

  return questionLoader(dispatch)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: `LOAD_OFFERS`,
        payload: adapter([{fake: true}]),
      });
    });
});
