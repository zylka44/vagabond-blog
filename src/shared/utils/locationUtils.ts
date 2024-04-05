import _ from 'lodash';

export const getLocationUrl = (location: string): string => {
  let x;
  let y;
  if (location.includes('N') || location.includes('S')) {
    const coords = location.split(location.includes('N') ? 'N, ' : 'S, ');
    x = coords[1].includes('E') ? coords[1].replace('E', '') : '-' + coords[1].replace('W', '');
    y = coords[0].includes('N') ? coords[0].replace('N', '') : '-' + coords[0].replace('S', '');
  } else {
    x = location.split(', ')[1];
    y = location.split(', ')[0];
  }
  return !_.isEmpty(x) && !_.isEmpty(y) ? `https://pl.mapy.cz/turisticka?q=${y}N%2C%20${x}E` : '';
};
