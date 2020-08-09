import React from 'react';
import {App} from '../app/app.jsx';
import renderer from 'react-test-renderer';
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

jest.mock(`../map/map`, () => jest.fn().mockReturnValue(null));
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
  id: 1,
  bedrooms: 3,
  description: `An independent House`,
  maxAdults: 4,
  type: `appartement`,
  price: 140,
  title: `just amazing1`,
  isPremium: true,
  isFavorite: true,
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

const offers = [mockedOffer, mockedOffer];

it(`App renders correctly`, () => {
  const store = mockStore({
    city: mockedCity,
    offers,
    activeSorting: `popular`
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <App
            authStatus={`NO_AUTH`}
            city={mockedOffer.city}
            cityZoom={12}
            locations={[mockedCity, mockedCity]}
            cityCoords={[mockedCity.latitude, mockedCity.longitude]}
            offers={offers}
            offerId={1}
            isFavorite={true}
            onMenuClick={() => {}}
            onSortingClick={() => {}}
            activeSorting={`popular`}
            login={() => {}}
            sendComment={() =>{}}
            onCardTitleClick={() =>{}}
            onCommentSend={() =>{}}
            onFavoriteButtonClick={() =>{}}
          />
        </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
