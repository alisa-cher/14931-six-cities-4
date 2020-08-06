import React from 'react';
import renderer from 'react-test-renderer';
import OfferDetails from '../offer-details/offer-details.jsx';
import {BrowserRouter} from "react-router-dom";

jest.mock(`../map/map`, () => jest.fn().mockReturnValue(null));

const offer = {
  bedrooms: 3,
  description: `An independent House`,
  maxAdults: 4,
  type: `appartement`,
  price: 140,
  title: `just amazing1`,
  isPremium: true,
  rating: 4.3,
  photos: [`img/room.jpg`, `img/studio-01.jpg`],
  goods: [`Heating`, `Kitchen`, `Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`],
  host: {
    avatar: `img/avatar.svg`,
    isPro: true,
    name: `Angelina`
  },
  previewPhoto: `img/apartment-01.jpg`,
};

const comments = [{
  user: {
    name: `Emely`,
    avatarUrl: `https://htmlacademy-react-3.appspot.com/six-cities/static/avatar/8.jpg`},
  rating: 4,
  comment: `Beautiful space, fantastic location and atmosphere, really a wonderful place to spend a few days. Will be back.`,
  date: `2020-06-17T10:54:44.806Z`
}];

it(`Property page renders correctly`, () => {
  const tree = renderer
    .create(
        <BrowserRouter>
          <OfferDetails
            offer={offer}
            nearbyOffers={[offer]}
            comments={comments}
            onCardTitleClick={() => {}}
            onCardHover={() => {}}
            onCardMouseLeave={() => {}}
            cityCoords={[0, 2]}
            cityZoom={1}
            onSubmit={() => {}}
            resetActiveItem={() => {}}
            setActiveItem={() => {}}/>
        </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
