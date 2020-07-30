import React from 'react';
import {shallow} from 'enzyme';
import withActiveItem from "./with-active-item";

describe(`e2e tests for withActiveItem hoc`, () => {
  const MockComponent = () => <div/>;
  const NewComponent = withActiveItem(MockComponent);

  it(`Component state initialized with null`, () => {
    const wrapper = shallow(<NewComponent/>);

    const state = wrapper.state();

    expect(state.activeCard).toBe(null);
  });

  it(`Component state changes when called onCardHover`, () => {
    const setActiveCardSpy = jest.spyOn(NewComponent.prototype, `_setActiveCard`);
    const wrapper = shallow(<NewComponent/>);

    wrapper.find(MockComponent).props().onCardHover({city: `test city`});
    expect(setActiveCardSpy).toHaveBeenCalled();

    const state = wrapper.state();

    expect(state.activeCard).toStrictEqual({city: `test city`});
  });

  it(`Component state changes when called onCardMouseLeave`, () => {
    const resetActiveCardSpy = jest.spyOn(NewComponent.prototype, `_resetActiveCard`);
    const wrapper = shallow(<NewComponent/>);

    wrapper.find(MockComponent).props().onCardMouseLeave();
    expect(resetActiveCardSpy).toHaveBeenCalled();

    const state = wrapper.state();

    expect(state.activeCard).toBe(null);
  });
});
