import React from 'react';
import MainPage from '../main/main.jsx';
import renderer from 'react-test-renderer';
import {BrowserRouter} from "react-router-dom";

jest.mock(`../map/map.jsx`, () => jest.fn().mockReturnValue(null));

const offers = [{
  type: `appartement`,
  price: 140,
  title: `just amazing1`,
  isPremium: true,
  rating: 4.3,
  previewPhoto: `img/apartment-01.jpg`
},
{
  type: `room`,
  price: 45,
  title: `just amazing2`,
  isPremium: false,
  rating: 4.0,
  previewPhoto: `img/apartment-02.jpg`
}];

const locations = [{
  location: {
    latitude: 1,
    longitude: 2,
    zoom: 0
  },
  name: `Paris`
}];

it(`Main page renders correctly`, () => {
  const tree = renderer
    .create(
        <BrowserRouter>
          <MainPage
            offers={offers}
            locations={locations}
            activeLocation={locations[0]}
            cityCoords={[0, 2]}
            cityZoom={1}
            onCardTitleClick={() => {}}
            onMenuClick={() => {}}/>
        </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
