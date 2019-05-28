/**
 * Make new array with unique elements from input array
 * @param {array} array
 * @return {array}
 */
export default (array) => {
  const obj = {};

  array.forEach((element) => {
    obj[element] = true;
  });

  return Object.keys(obj);
};
