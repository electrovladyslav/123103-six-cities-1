import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import CitiesList from "./cities-list.jsx";

Enzyme.configure({adapter: new Adapter()});
const fakeCities = [
  {name: `Oslo`},
  {name: `Zurich`},
  {name: `Paris`},
  {name: `Kiev`},
  {name: `Riga`},
  {name: `Vienna`},
];
const fakeHandler = jest.fn();

const app = shallow(
    <CitiesList elements={fakeCities} onElementActivate={fakeHandler} activeElementNumber={1}/>
);

const cityTitles = app.find(`.locations__item-link`);
cityTitles.forEach((cityTitle) => {
  cityTitle.simulate(`click`, {preventDefault() {}});
});

it(`In CitiesList component click on cities works`, () => {
  expect(fakeHandler).toHaveBeenCalledTimes(6);
});

it(`In CitiesList component handler calls with right arguments`, () => {
  fakeCities.forEach((city, number) => {
    expect(fakeHandler).toHaveBeenNthCalledWith(number + 1, city);
  });
});
