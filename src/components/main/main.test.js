import React from 'react';
import MainPage from '../main/main.jsx';
import renderer from 'react-test-renderer';


it(`Main page renders correctly`, () => {
  const tree = renderer
    .create(
        <MainPage
          numberOfOffers={7}
          offersTitles={[`Beautiful & luxurious apartment at great location`, `Wood and stone place`]}
          onCardTitleClick={() => {}}/>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
