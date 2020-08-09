import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from "react-router-dom";
import OffersList from "../offers-list/offers-list.jsx";

it(`Offers list renders ok`, () => {
  const offers = [{
    id: 5,
    type: `appartement`,
    price: 140,
    title: `just amazing1`,
    isPremium: true,
    isFavorite: true,
    rating: 4.3,
    previewPhoto: `img/apartment-01.jpg`,
  }];

  const tree = renderer
    .create(
        <BrowserRouter>
          <OffersList
            offers={offers}
            onCardTitleClick={() => {}}
            onCardHover={() => {}}
            onCardMouseLeave={() => {}}
            onFavoriteButtonClick={() => {}}
            classNamePrefix={`just-some-prefix-for-tests`}
          />
        </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
