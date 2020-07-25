import React from 'react';
import LocationsList from "./locations-list.jsx";
import renderer from 'react-test-renderer';

const locations = [{
  location: {
    latitude: 1,
    longitude: 2,
    zoom: 3
  },
  name: `Brussels`
}];

it(`Locations List renders correctly`, () => {
  const tree = renderer
    .create(
        <LocationsList
          locations={locations}
          activeLocation={locations[0]}
          onMenuClick={() => {}}
        />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

