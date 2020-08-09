import React from 'react';
import renderer from 'react-test-renderer';
import FavoritesPage from "./favorites-page.jsx";
import {BrowserRouter} from "react-router-dom";

const offers = [{
  id: 15,
  bedrooms: 3,
  description: `An independent House`,
  maxAdults: 4,
  type: `appartement`,
  price: 140,
  title: `just amazing1`,
  isPremium: true,
  isFavorite: true,
  rating: 4.3,
  photos: [`img/room.jpg`, `img/studio-01.jpg`],
  goods: [`Heating`, `Kitchen`, `Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`],
  host: {
    avatar: `img/avatar.svg`,
    isPro: true,
    name: `Angelina`
  },
  previewPhoto: `img/apartment-01.jpg`,
}];

const favoriteOffers = [{
  city: `Amsterdam`,
  offers
}];

it(`Favorites page renders correctly`, () => {
  const tree = renderer
    .create(
        <BrowserRouter>
          <FavoritesPage
            offers={favoriteOffers}
            isUserLoggedIn={true}
            userPhoto={`/img/user-photo.jpg`}
            userEmail={`some-valid-email`}
            onFavoriteButtonClick={() => {}}
            onCardTitleClick={() => {}}
          />
        </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
