import React from 'react';
import {App} from '../app/app.jsx';
import renderer from 'react-test-renderer';
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

jest.mock(`../map/map`, () => jest.fn().mockReturnValue(null));
const mockStore = configureStore([]);

// TOASK: непонятно, как тестировать компонент, обернутый в коннект

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
  city: {
    location: {
      latitude: 50.85045,
      longitude: 4.34878,
      zoom: 12
    },
    name: `Brussels`
  },
};

const offers = [mockedOffer, mockedOffer];

it(`App renders correctly`, () => {
  const store = mockStore({
    city: mockedCity,
    offers
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <App/>
        </Provider>, {
          createNodeMock: () => {
            return {};
          }
        }
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
