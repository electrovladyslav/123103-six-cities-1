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
      rating: Math.round(offer.rating),
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
