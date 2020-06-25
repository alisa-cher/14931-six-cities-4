import React from 'react';
import App from '../app/app.jsx';
import renderer from 'react-test-renderer';


it(`App renders correctly`, () => {
  const tree = renderer
    .create(
        <App
          numberOfOffers={7}
          offersTitles={[`Beautiful & luxurious apartment at great location`, `Wood and stone place`]}
          onCardTitleClick={() => {}}/>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
