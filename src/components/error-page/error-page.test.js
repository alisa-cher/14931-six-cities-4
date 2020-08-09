import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from "react-router-dom";
import ErrorPage from "./error-page.jsx";

it(`Error page renders correctly`, () => {
  const tree = renderer
    .create(
        <BrowserRouter>
          <ErrorPage isUserLoggedIn={false}/>
        </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
