import React from 'react';
import renderer from 'react-test-renderer';
import OfferCard from "./offer-card";


it(`Offer card renders ok`, () => {
  const offer = {
    type: `appartement`,
    price: 140,
    description: `just amazing`,
    isPremium: true,
    photo: `img/apartment-03.jpg`
  };

  const tree = renderer
    .create(
        <OfferCard
          onCardTitleClick={() => {}}
          onCardHover={() => {}}
          offer={offer}
        />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
