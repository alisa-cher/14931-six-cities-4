import React from 'react';
import renderer from 'react-test-renderer';
import OfferCard from "./offer-card";
import {BrowserRouter} from "react-router-dom";


it(`Offer card renders ok`, () => {
  const offer = {
    id: 0,
    type: `appartement`,
    price: 140,
    title: `just amazing`,
    isPremium: true,
    previewPhoto: `img/apartment-03.jpg`,
    rating: 1,
    isFavorite: false
  };

  const tree = renderer
    .create(
        <BrowserRouter>
          <OfferCard
            onCardTitleClick={() => {}}
            onCardHover={() => {}}
            onMouseLeave={() => {}}
            offer={offer}
            classNamePrefix={`just-some-prefix-for-tests`}
            onButtonClick={() => {}}/>
        </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
