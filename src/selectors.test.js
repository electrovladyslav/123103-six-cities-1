import {filterOffersByCity} from "./selectors";

const mockOffers = [
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

it(`Offers filter correctly`, () => {

  expect(filterOffersByCity(mockOffers, {name: `Amsterdam`})).toEqual([
    {city: {name: `Amsterdam`}},
    {city: {name: `Amsterdam`}},
  ]);

  expect(filterOffersByCity(mockOffers, {name: `Moscow`})).toEqual([
    {city: {name: `Moscow`}},
  ]);


  expect(filterOffersByCity(mockOffers, {name: `Barselona`})).toEqual([]);
});

it(`Cached results for same city`, () => {
  const result1 = filterOffersByCity(mockOffers, {name: `Amsterdam`});
  const result2 = filterOffersByCity(mockOffers, {name: `Amsterdam`});
  expect(result1).toStrictEqual(result2);
});
