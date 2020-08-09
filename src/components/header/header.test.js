import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from "react-router-dom";
import Header from "./header.jsx";

it(`Header correctly`, () => {
  const tree = renderer
    .create(
        <BrowserRouter>
          <Header
            isUserLoggedIn={true}
            email={`some-valid-email`}
            photo={`some-file-path`}
          />
        </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
