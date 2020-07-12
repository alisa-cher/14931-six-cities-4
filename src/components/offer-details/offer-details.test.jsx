import React from 'react';
import renderer from 'react-test-renderer';
import OfferDetails from '../offer-details/offer-details.jsx';

const offer = {
  bedrooms: 3,
  description: `An independent House`,
  maxAdults: 4,
  type: `appartement`,
  price: 140,
  title: `just amazing1`,
  isPremium: true,
  rating: 4.3,
  photos: [`img/room.jpg`, `img/studio-01.jpg`],
  goods: [`Heating`, `Kitchen`, `Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`],
  host: {
    avatar: `img/avatar.svg`,
    isPro: true,
    name: `Angelina`
  },
};

it(`Property page renders correctly`, () => {
  const tree = renderer
    .create(
        <OfferDetails offer={offer}/>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
