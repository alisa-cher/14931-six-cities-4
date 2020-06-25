import React from 'react';
import MainPage from '../main/main.jsx';
import {shallow} from 'enzyme';

it(`Card title is clicked`, () => {
  const clickHandler = jest.fn();

  const mainPage = shallow(
      <MainPage
        numberOfOffers={7}
        offersTitles={[``]}
        onCardTitleClick={clickHandler}/>
  );
  const cardTitle = mainPage.find(`.place-card__name`);
  cardTitle.simulate(`click`);
  expect(clickHandler).toHaveBeenCalled();
});
