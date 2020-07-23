import React from 'react';
import {mount} from 'enzyme';
import App from "./app.jsx";

jest.mock(`../map/map.jsx`, () => jest.fn().mockReturnValue(null));
jest.mock(`../offer-details/offer-details.jsx`, () => jest.fn().mockReturnValue(null));

const offers = [{
  type: `appartement`,
  price: 140,
  title: `just amazing`,
  isPremium: true,
  previewPhoto: `img/apartment-03.jpg`,
  city: {
    name: `Brussels`
  },
}];

it(`App state changes on offer card click`, () => {
  const app = mount(
      <App
        offers={offers}
        onCardTitleClick={() => offers[0]}
      />
  );
  const cardTitle = app.find(`.place-card__name`);
  cardTitle.simulate(`click`);

  const state = app.state().detailedOffer;
  expect(state).toBe(offers[0]);
});

it(`App state changes on offer card click 1`, () => {
  const app = mount(
      <App
        offers={offers}
      />
  );
  const menuItem = app.find(`.locations__item-link`);
  menuItem.simulate(`click`);

  const state = app.state().activeLocation;
  expect(state).toBe(`Brussels`);
});
