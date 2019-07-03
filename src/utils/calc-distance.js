export const calcDistance = (latitude1, longitude1, latitude2, longitude2) => {
  let radialLatitude1 = Math.PI * latitude1 / 180;
  let radialLatitude2 = Math.PI * latitude2 / 180;
  let longitudeDiff = longitude1 - longitude2;
  let radialLongitudeDiff = Math.PI * longitudeDiff / 180;
  let distance = Math.sin(radialLatitude1) * Math.sin(radialLatitude2) +
    Math.cos(radialLatitude1) * Math.cos(radialLatitude2) * Math.cos(radialLongitudeDiff);
  if (distance > 1) {
    distance = 1;
  }
  distance = Math.acos(distance);
  distance = distance * 180 / Math.PI;
  distance = distance * 60 * 1.1515;
  distance = distance * 1.609344;
  return distance;
};
