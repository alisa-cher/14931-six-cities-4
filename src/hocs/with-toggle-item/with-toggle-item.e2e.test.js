import React from 'react';
import {shallow} from 'enzyme';
import withToggleItem from "./with-toggle-item.jsx";

describe(`e2e tests for withActiveItem hoc`, () => {
  const MockComponent = () => <div/>;
  const NewComponent = withToggleItem(MockComponent);

  it(`Component state initialized with false`, () => {
    const wrapper = shallow(<NewComponent/>);

    const state = wrapper.state();

    expect(state.isDisabled).toBe(true);
  });

  it(`Component state changes when called _handleItemToggle`, () => {
    const setToggleItemSpy = jest.spyOn(NewComponent.prototype, `_handleItemToggle`);
    const wrapper = shallow(<NewComponent/>);

    wrapper.find(MockComponent).props().onItemToggle(false);
    expect(setToggleItemSpy).toHaveBeenCalled();

    const state = wrapper.state();

    expect(state.isDisabled).toStrictEqual(false);
  });
});
