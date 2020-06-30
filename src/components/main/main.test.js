import React from 'react';
import MainPage from '../main/main.jsx';
import renderer from 'react-test-renderer';

const offers = [{
  type: `appartement`,
  price: 140,
  description: `just amazing1`,
  isPremium: true,
  rating: 4.3,
  photo: `img/apartment-01.jpg`,
},
{
  type: `room`,
  price: 45,
  description: `just amazing2`,
  isPremium: false,
  rating: 4.0,
  photo: `img/apartment-02.jpg`,
}];


it(`Main page renders correctly`, () => {
  const tree = renderer
    .create(
        <MainPage
          offers={offers}
          onCardTitleClick={() => {
          }}/>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
