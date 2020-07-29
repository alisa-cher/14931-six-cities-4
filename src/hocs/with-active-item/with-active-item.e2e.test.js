import React from 'react';
import {shallow} from 'enzyme';
import withActiveItem from "./with-active-item";

it(`Component state changes when called onCardHover`, () => {
  const element = `div`;
  const NewComponent = withActiveItem(element);
  const setActiveCardSpy = jest.spyOn(NewComponent.prototype, `_setActiveCard`);

  const wrapper = shallow(<NewComponent/>);
  wrapper.find(element).props().onCardHover({city: `test city`});
  expect(setActiveCardSpy).toHaveBeenCalled();
  const state = wrapper.state();
  expect(state.activeCard).toStrictEqual({city: `test city`});
});

it(`Component state changes when called onCardMouseLeave`, () => {
  const element = `div`;
  const NewComponent = withActiveItem(element);
  const resetActiveCardSpy = jest.spyOn(NewComponent.prototype, `_resetActiveCard`);

  const wrapper = shallow(<NewComponent/>);
  wrapper.find(element).props().onCardMouseLeave();
  expect(resetActiveCardSpy).toHaveBeenCalled();
  const state = wrapper.state();
  expect(state.activeCard).toBe(null);
});
