/**
 * Make new array with unique elements filtered by name field
 * @param {array} array
 * @return {array}
 */

export default (array) => {

  const hash = array.reduce((obj, current) => {
    if (!obj[current.name]) {
      obj[current.name] = current;
    }
    return obj;
  }, {});

  return Object.values(hash);
};
