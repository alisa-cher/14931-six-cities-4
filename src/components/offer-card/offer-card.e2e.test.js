import React from 'react';
import {shallow} from 'enzyme';
import OfferCard from "./offer-card";

const offer = {
  type: `house`,
  price: 100,
  title: `just amazing3`,
  isPremium: false,
  rating: 2.3,
  previewPhoto: `img/apartment-03.jpg`,
};

it(`Card is hovered`, () => {
  const clickHandler = jest.fn();

  const offerCard = shallow(
      <OfferCard
        onCardTitleClick={() => {}}
        onCardHover={clickHandler}
        offer={offer}
      />
  );
  offerCard.simulate(`mouseEnter`);
  expect(clickHandler).toHaveBeenCalledWith(offer);
});
