import getUniqueElementsByName from "./get-unique-elements-by-name";

it(`Offers array by name field correctly`, () => {
  const mockArray = [
    {
      name: `Amsterdam`,
    },
    {
      name: `Moscow`,
    },
    {
      name: `Amsterdam`,
    },
    {
      name: `New York`,
    },
  ];

  expect(getUniqueElementsByName(mockArray)).toEqual([
    {
      name: `Amsterdam`,
    },
    {
      name: `Moscow`,
    },
    {
      name: `New York`,
    },
  ]);

  const mockArray2 = [
    {
      name: `Amsterdam`,
    },
    {
      name: `Amsterdam`,
    },
    {
      name: `Amsterdam`,
    },
    {
      name: `Amsterdam`,
    },
  ];

  expect(getUniqueElementsByName(mockArray2)).toEqual([
    {
      name: `Amsterdam`,
    },
  ]);

  const mockArray3 = [
    {
      name: `Moscow`,
    },
    {
      name: `Amsterdam`,
    },
    {
      name: `New York`,
    },
  ];

  expect(getUniqueElementsByName(mockArray3)).toEqual([
    {
      name: `Moscow`,
    },
    {
      name: `Amsterdam`,
    },
    {
      name: `New York`,
    },
  ]);

  const mockArray4 = [
    {},
  ];

  expect(getUniqueElementsByName(mockArray4)).toEqual([
    {},
  ]);
});
