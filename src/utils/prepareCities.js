import getUniqueCities from "./getUniqueElementsByName";
import dumpCities from "../mocks/cities";


export default (inletCities) => {
  let cities = inletCities.concat(dumpCities);
  cities = getUniqueCities(cities);
  cities = cities.slice(0, 6);

  return cities;
};
