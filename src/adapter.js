// [
//   {
//     id: 1,
//     city: {
//       name: "Amsterdam",
//       location: {
//         latitude: 52.370216,
//         longitude: 4.895168,
//         zoom: 10
//       }
//     },
//     preview_image: "img/1.png",
//     images: ["img/1.png", "img/2.png"],
//     title: "Beautiful & luxurious studio at great location",
//     is_favorite: false,
//     is_premium: false,
//     rating: 4.8,
//     type: "apartment",
//     bedrooms: 3,
//     max_adults: 4,
//     price: 120,
//     goods: ["Heating", "Kitchen", "Cable TV", "Washing machine", "Coffee machine", "Dishwasher"],
//     host: {
//       id: 3,
//       is_pro: true,
//       name: "Angelina",
//       avatar_url: "img/1.png"
//     },
//     description: "A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.",
//     location: {
//       latitude: 52.35514938496378,
//       longitude: 4.673877537499948,
//       zoom: 8
//     }
//   }
// ]
export default (offersFromServer) => {
  return offersFromServer.map((offer) => {
    return {
      id: offer.id,
      city: offer.city,
      previewImageSource: offer.preview_image,
      images: offer.images,
      name: offer.title,
      isFavorite: offer.is_favorite,
      isPremium: offer.is_premium,
      rating: offer.rating,
      type: offer.type,
      bedrooms: offer.bedrooms,
      maxAdults: offer.max_adults,
      price: offer.price,
      goods: offer.goods,
      description: offer.description,
      location: offer.location,
      host: {
        id: offer.id,
        isPro: offer.os_pro,
        name: offer.name,
        avatarUrl: offer.avatar_url,
      },
    };
  });
};
