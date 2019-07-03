import getNearestOffers from "./getNearestOffers";

const mockCenterOffer = {
  location: {
    latitude: 0,
    longitude: 0,
  },
};

const mockAllOffers = [
  {
    location: {
      latitude: 0,
      longitude: 0,
    },
  },
  {
    location: {
      latitude: 1,
      longitude: 1,
    },
  },
  {
    location: {
      latitude: 2,
      longitude: 2,
    },
  },
  {
    location: {
      latitude: 3,
      longitude: 3,
    },
  },
  {
    location: {
      latitude: 4,
      longitude: 4,
    },
  },
  {
    location: {
      latitude: 5,
      longitude: 5,
    },
  },
  {
    location: {
      latitude: 6,
      longitude: 6,
    },
  },
];
it(`Function getNearestOffers corrextly make work`, () => {
  expect(getNearestOffers(mockCenterOffer, mockAllOffers)).toEqual([
    {
      location: {
        latitude: 1,
        longitude: 1,
      },
    },
    {
      location: {
        latitude: 2,
        longitude: 2,
      },
    },
    {
      location: {
        latitude: 3,
        longitude: 3,
      },
    },
  ]);
});
