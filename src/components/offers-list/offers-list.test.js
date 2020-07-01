import React from 'react';
import renderer from 'react-test-renderer';
import OffersList from "../offers-list/offers-list.jsx";

it(`Offers list renders ok`, () => {
  const offers = [{
    type: `appartement`,
    price: 140,
    description: `just amazing1`,
    isPremium: true,
    rating: 4.3,
    photo: `img/apartment-01.jpg`,
  }];

  const tree = renderer
    .create(
        <OffersList
          offers={offers}
          onCardTitleClick={() => {}}
        />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
