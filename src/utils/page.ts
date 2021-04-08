import map from 'lodash/map';
export const urlToList = (url: string) => {
  if (url) {
    const urlList = url.split('/').filter((i) => i);
    return map(urlList, (urlItem, index) => `/${urlList.slice(0, index + 1).join('/')}`);
  }
  return [];
};
