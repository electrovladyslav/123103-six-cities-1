import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withActiveElement from "./with-active-element.jsx";

configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withActiveElement(MockComponent);
const onElementActivate = jest.fn();
const elements = [{number: 0}, {number: 1}, {number: 2}, {number: 3}, {number: 4}, {number: 5}];

it(`Should change activeElementNumber when call cities`, () => {
  const wrapper = shallow(
      <MockComponentWrapped elements={elements} onElementActivate={onElementActivate} />
  );

  wrapper.props().onElementActivate(wrapper.props().elements[0]);
  expect(wrapper.props().activeElementNumber).toEqual(0);

  wrapper.props().onElementActivate(wrapper.props().elements[1]);
  expect(wrapper.props().activeElementNumber).toEqual(1);

  wrapper.props().onElementActivate(wrapper.props().elements[2]);
  expect(wrapper.props().activeElementNumber).toEqual(2);

});
