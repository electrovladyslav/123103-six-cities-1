const initialState = {
  city: {
    name: `Amsterdam`,
    location: {
      latitude: 52.370216,
      longitude: 4.895168,
      zoom: 10
    }
  },
  offers: [
    {
      city: {
        name: `Amsterdam`,
        location: {
          latitude: 52.370216,
          longitude: 4.895168,
          zoom: 10
        }
      },
      isPremium: true,
      imageSource: `img/apartment-01.jpg`,
      price: 120,
      isBookmarked: false,
      rating: 4.5,
      name: `Beautiful & luxurious apartment at great location`,
      type: `Apartment`,
      coordinates: [52.3909553943508, 4.85309666406198],
    },
    {
      city: {
        name: `Amsterdam`,
        location: {
          latitude: 52.370216,
          longitude: 4.895168,
          zoom: 10
        }
      },
      isPremium: false,
      imageSource: `img/room.jpg`,
      price: 80,
      isBookmarked: true,
      rating: 4,
      name: `Wood and stone place`,
      type: `Private room`,
      coordinates: [52.369553943508, 4.85309666406198],
    },
    {
      city: {
        name: `Amsterdam`,
        location: {
          latitude: 52.370216,
          longitude: 4.895168,
          zoom: 10
        }
      },
      isPremium: false,
      imageSource: `img/apartment-02.jpg`,
      price: 132,
      isBookmarked: false,
      rating: 4,
      name: `Canal View Prinsengracht`,
      type: `Apartment`,
      coordinates: [52.3909553943508, 4.929309666406198],
    },
    {
      city: {
        name: `Amsterdam`,
        location: {
          latitude: 52.370216,
          longitude: 4.895168,
          zoom: 10
        }
      },
      isPremium: true,
      imageSource: `img/apartment-03.jpg`,
      price: 180,
      isBookmarked: false,
      rating: 5,
      name: `Nice, cozy, warm big bed apartment`,
      type: `Apartment`,
      coordinates: [52.3809553943508, 4.939309666406198],
    },
  ],
};

const filterOffersByCity = (offers, city) => {
  return offers.filter((offer) => offer.city === city);
};

export const ActionCreator = {
  changeCity: (city) => ({
    type: `CHANGE_CITY`,
    payload: city,
  }),

  getOffers: (offers, city) => {
    return {
      type: `GET_OFFERS`,
      payload: filterOffersByCity(offers, city),
    };
  },
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case `CHANGE_CITY`:
      return Object.assign({}, state, {
        city: action.payload,
      });
    case `GET_OFFERS`:
      return Object.assign({}, state, {
        offers: action.payload,
      });
  }

  return state;
}
