import React from 'react';
import renderer from 'react-test-renderer';
import Map from "./map";

it(`Map renders ok`, () => {
  const div = document.createElement(`div`);
  div.id = `map`;
  document.body.appendChild(div);

  const offers = [{
    location: {
      latitude: 52.369553943508,
      longitude: 4.85309666406198,
    },
  }];

  const tree = renderer
    .create(
        <Map offers={offers}/>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
