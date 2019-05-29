/**
 * Make new array with unique elements filtered by name field
 * @param {array} array
 * @return {array}
 */

export default (array) => {
  const obj = {};

  return array.reduce((arr, current) => {
    if (!obj[current.name]) {
      obj[current.name] = true;
      arr.push(current);
    }
    return arr;
  }, []);
};
