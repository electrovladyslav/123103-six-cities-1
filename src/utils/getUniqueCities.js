export default (array) => {
  const obj = {};
  const resultArr = [];

  array.forEach((element) => {
    if (!obj[element.name]) {
      obj[element.name] = true;
      resultArr.push(element);
    }
  });

  return resultArr;
};
