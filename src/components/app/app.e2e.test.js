import React from 'react';
import {mount} from 'enzyme';
import {App} from "./app.jsx";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

jest.mock(`../map/map.jsx`, () => jest.fn().mockReturnValue(null));
jest.mock(`../offer-details/offer-details.jsx`, () => jest.fn().mockReturnValue(null));
const mockStore = configureStore([]);

const mockedCity = {
  location: {
    latitude: 2,
    longitude: 2,
    zoom: 2,
  },
  name: `Brussels`
};

const mockedOffer = {
  bedrooms: 3,
  description: `An independent House`,
  maxAdults: 4,
  type: `appartement`,
  price: 140,
  title: `just amazing1`,
  isPremium: true,
  rating: 4.3,
  previewPhoto: `img/apartment-01.jpg`,
  photos: [`img/room.jpg`, `img/studio-01.jpg`],
  goods: [`Heating`, `Kitchen`, `Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`],
  host: {
    avatar: `img/avatar.svg`,
    isPro: true,
    name: `Angelina`
  },
  location: {
    latitude: 50.842557,
    longitude: 4.3536969999999995,
  },
  city: mockedCity
};

const offers = [mockedOffer, Object.assign({}, mockedOffer, {price: 200})];

it(`App state changes on offer card click`, () => {
  const store = mockStore({
    city: mockedCity,
    offers,
    activeSorting: `popular`
  });

  const app = mount(
      <Provider store={store}>
        <App
          city={mockedOffer.city}
          cityZoom={12}
          locations={[mockedCity, mockedCity]}
          cityCoords={[mockedCity.latitude, mockedCity.longitude]}
          offers={offers}
          onMenuClick={() => {}}
          onSortingClick={() => {}}
          activeSorting={`popular`}
        />
      </Provider>, {
        createNodeMock: () => {
          return {};
        }
      }
  );

  const componentInstance = app.childAt(0).instance();

  const cardTitle = app.find(`.place-card__name`).at(1);
  cardTitle.simulate(`click`);

  const state = componentInstance.state.detailedOffer;
  expect(state).toBe(offers[1]);
});
