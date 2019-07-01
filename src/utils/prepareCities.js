import getUniqueCities from "./getUniqueElementsByName";


export default (inletCities) => {
  let cities = inletCities;
  cities = getUniqueCities(cities);
  cities = cities.slice(0, 6);

  return cities;
};
