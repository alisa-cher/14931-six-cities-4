
export const mapHotels = (offers) => {
  return offers.map((offer) => ({
    id: offer.id,
    bedrooms: offer.bedrooms,
    title: offer.title,
    isPremium: offer.is_premium,
    maxAdults: offer.max_adults,
    previewPhoto: offer.preview_image,
    price: offer.price,
    type: offer.type,
    description: offer.description,
    location: {
      latitude: offer.location.latitude,
      longitude: offer.location.longitude,
      zoom: offer.location.zoom,
    },
    rating: offer.rating,
    photos: offer.images,
    goods: offer.goods,
    host: {
      avatar: offer.host.avatar_url,
      id: offer.host.id,
      isPro: offer.host.is_pro,
      name: offer.host.name
    },
    city: {
      location: {
        latitude: offer.city.location.latitude,
        longitude: offer.city.location.longitude,
        zoom: offer.city.location.zoom
      },
      name: offer.city.name
    },
  }));
};


export const mapUser = (user) => {
  return {
    email: user.email,
    avatarUrl: `https://4.react.pages.academy/six-cities` + user.avatar_url,
    id: user.id,
    isPro: user.is_pro,
    name: user.name
  };
};
