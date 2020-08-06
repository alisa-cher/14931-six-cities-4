import React from 'react';
import {shallow} from 'enzyme';
import withActiveItem from "./with-active-item";

describe(`e2e tests for withActiveItem hoc`, () => {
  const MockComponent = () => <div/>;
  const NewComponent = withActiveItem(MockComponent);

  it(`Component state initialized with null`, () => {
    const wrapper = shallow(<NewComponent/>);

    const state = wrapper.state();

    expect(state.activeItem).toBe(null);
  });

  it(`Component state changes when called onItemHover`, () => {
    const setActiveItemSpy = jest.spyOn(NewComponent.prototype, `_setActiveItem`);
    const wrapper = shallow(<NewComponent/>);

    wrapper.find(MockComponent).props().setActiveItem({city: `test city`});
    expect(setActiveItemSpy).toHaveBeenCalled();

    const state = wrapper.state();

    expect(state.activeItem).toStrictEqual({city: `test city`});
  });

  it(`Component state changes when called onItemMouseLeave`, () => {
    const resetActiveItemSpy = jest.spyOn(NewComponent.prototype, `_resetActiveItem`);
    const wrapper = shallow(<NewComponent/>);

    wrapper.find(MockComponent).props().resetActiveItem();
    expect(resetActiveItemSpy).toHaveBeenCalled();

    const state = wrapper.state();

    expect(state.activeItem).toBe(null);
  });
});
