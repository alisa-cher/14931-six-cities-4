import React from 'react';
import App from '../app/app.jsx';
import renderer from 'react-test-renderer';

jest.mock(`../map/map`, () => jest.fn().mockReturnValue(null));

const offers = [{
  type: `appartement`,
  price: 140,
  title: `just amazing1`,
  isPremium: true,
  rating: 4.3,
  photo: `img/apartment-01.jpg`,
  previewPhoto: `img/apartment-03.jpg`
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
