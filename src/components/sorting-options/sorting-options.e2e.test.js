import React from 'react';
import {shallow} from 'enzyme';
import SortingOptions from "./sorting-options.jsx";

it(`Sorting option is changed`, () => {
  const clickHandler = jest.fn();
  const mockEvent = {
    target: {
      value: `test value`
    }
  };

  const sortingPanel = shallow(
      <SortingOptions
        onSortingClick={clickHandler}
        activeSorting={`to-high`}
      />
  );
  sortingPanel.find(`select`).simulate(`change`, mockEvent);
  expect(clickHandler).toHaveBeenCalled();
});
