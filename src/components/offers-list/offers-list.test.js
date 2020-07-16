import React from 'react';
import renderer from 'react-test-renderer';
import OffersList from "../offers-list/offers-list.jsx";
import {BrowserRouter} from "react-router-dom";

it(`Offers list renders ok`, () => {
  const offers = [{
    type: `appartement`,
    price: 140,
    title: `just amazing1`,
    isPremium: true,
    rating: 4.3,
    previewPhoto: `img/apartment-01.jpg`,
  }];

  const tree = renderer
    .create(
        <BrowserRouter>
          <OffersList
            offers={offers}
            onCardTitleClick={() => {}}
            classNamePrefix={`just-some-prefix-for-tests`}
          />
        </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
