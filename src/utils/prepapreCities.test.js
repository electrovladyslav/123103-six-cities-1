import prepareCities from "./prepareCities";

it(`Function prpareCities always retun 6 cities.`, () => {
  expect(prepareCities([])).toHaveLength(6);
});
