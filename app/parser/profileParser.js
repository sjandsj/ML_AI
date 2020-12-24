import { images } from '../assets/images';

export const createProfileData = (data, type) => {
  const obj = [];
  const imageText = [
    images.languageIcon,
    images.dialectIcon,
    images.countryIcon,
    images.occupationIcon,
    images.organization,
    images.oddsIcon,
    images.team,
    images.leagueIcon,
    images.tournament,
    images.cup,
    images.fan,
    images.locationIcon,
    images.drawer_icon_online,
    images.talk,
    images.video_compete,
    images.drawer_icon_about_us,
  ];

  for (let key in data) {
    if (data.hasOwnProperty(key) && (type === 'PREFERENCES' || type === 'FAVORITES')) {
      var val = data[key];
      obj.push({ name: key.replace(/_/g, ' ').toUpperCase(), value: val, imageSource: imageText[i] });
    } else if (data.hasOwnProperty(key) && type === 'FAN_CLUB') {
      if (key !== 'chapter_street' && key !== 'chapter_city' && key !== 'chapter_country' && key !== 'chapter_zip') {
        var val = data[key];
        obj.push({ name: key.replace(/_/g, ' ').toUpperCase(), value: [{ name: val }], imageSource: imageText[i] });
      } else {
        i--;
      }
    } else if (data.hasOwnProperty(key) && type === 'INTERESTS') {
      var val = data[key];
      if (val) {
        obj.push({ name: key.replace(/_/g, ' ').toUpperCase(), value: val, imageSource: imageText[i] });
      }
    }
    i++;
    if (i === 15) {
      i = 0;
    }
  }
  return obj;
};