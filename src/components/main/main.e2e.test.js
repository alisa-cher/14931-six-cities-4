import React from 'react';
import MainPage from '../main/main.jsx';
import {mount} from 'enzyme';
import {BrowserRouter} from "react-router-dom";

jest.mock(`../map/map.jsx`, () => jest.fn().mockReturnValue(null));

const offers = [{
  type: `appartement`,
  price: 140,
  title: `just amazing1`,
  isPremium: true,
  rating: 4.3,
  previewPhoto: `img/apartment-01.jpg`,
}];

it(`Card title is clicked`, () => {
  const clickHandler = jest.fn();

  const mainPage = mount(
      <BrowserRouter>
        <MainPage
          offers={offers}
          onCardTitleClick={clickHandler}/>
      </BrowserRouter>
  );
  const cardTitle = mainPage.find(`.place-card__name`);
  cardTitle.simulate(`click`);
  expect(clickHandler).toHaveBeenCalled();
});
