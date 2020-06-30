import React from 'react';
import App from '../app/app.jsx';
import renderer from 'react-test-renderer';

const offers = [{
  type: `appartement`,
  price: 140,
  description: `just amazing1`,
  isPremium: true,
  rating: 4.3,
  photo: `img/apartment-01.jpg`,
}];

it(`App renders correctly`, () => {
  const tree = renderer
    .create(
        <App
          offers={offers}
          onCardTitleClick={() => {}}/>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
