import React from 'react';
import {mount} from 'enzyme';
import App from "./app";

const offer = {
  type: `appartement`
};

it(`App state changes on offer card click`, () => {
  const app = mount(
      <App
        offers={[]}
        onCardTitleClick={() => offer}/>
  );
  const cardTitle = app.find(`.place-card__name`);
  cardTitle.simulate(`click`);
  const state = app.state().detailedOffer;
  expect(state).toBe(offer);
});
