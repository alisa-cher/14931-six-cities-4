import React from 'react';
import renderer from 'react-test-renderer';
import OfferCard from "./offer-card";
import {BrowserRouter} from "react-router-dom";


it(`Offer card renders ok`, () => {
  const offer = {
    type: `appartement`,
    price: 140,
    title: `just amazing`,
    isPremium: true,
    previewPhoto: `img/apartment-03.jpg`
  };

  const tree = renderer
    .create(
        <BrowserRouter>
          <OfferCard
            onCardTitleClick={() => {}}
            onCardHover={() => {}}
            offer={offer}
            classNamePrefix={`just-some-prefix-for-tests`}
          />
        </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
