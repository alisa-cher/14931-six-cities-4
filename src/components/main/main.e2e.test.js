import React from 'react';
import MainPage from '../main/main.jsx';
import {mount} from 'enzyme';

const offers = [{
  type: `appartement`,
  price: 140,
  description: `just amazing1`,
  isPremium: true,
  rating: 4.3,
  photo: `img/apartment-01.jpg`,
}];

it(`Card title is clicked`, () => {
  const clickHandler = jest.fn();

  const mainPage = mount(
      <MainPage
        offers={offers}
        onCardTitleClick={clickHandler}/>
  );
  const cardTitle = mainPage.find(`.place-card__name`);
  cardTitle.simulate(`click`);
  expect(clickHandler).toHaveBeenCalled();
});
