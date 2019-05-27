const initialState = {
  city: {
    name: `Amsterdam`,
    coordinates: [52.38333, 4.9],
    rentsCount: 312,
  },
  offers: [
    {
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
      isPremium: true,
      imageSource: `img/apartment-03.jpg`,
      price: 180,
      isBookmarked: false,
      rating: 5,
      name: `Nice, cozy, warm big bed apartment`,
      type: `Apartment`,
      coordinates: [52.3809553943508, 4.939309666406198],
    }
  ],
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case `CHANGE_CITY` :
      return Object.assign({}, state, {
        city: action.payload,
      });
    case `GET_OFFERS` :
      return Object.assign({}, state, {
        offers: action.payload,
      });
  }

  return state;
}

