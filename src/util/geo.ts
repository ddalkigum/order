import proj4 from 'proj4';

export const convertEPSG2097ToWGS84 = (x: number, y: number) => {
  // UTM-K 좌표계
  const eps2097 = '+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +units=m +no_defs';
  // wgs84(위경도)좌표계
  const wgs84 = '+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees';

  return proj4(eps2097, wgs84, [x, y]);
};
