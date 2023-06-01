import { readFileSync, writeFileSync } from 'fs';

const makeSubscribePressList = () => {
  const mediaNameList = JSON.parse(readFileSync('./server/data/newsMedia.json').toString()).map(
    (media) => {
      const { alt } = media;
      return alt;
    }
  );

  const subscribePressList = mediaNameList.reduce((subscribePressList, mediaName) => {
    subscribePressList[mediaName] = false;
    return subscribePressList;
  }, {});

  return subscribePressList;
};

const subscribePressList = makeSubscribePressList();
const jsonData = JSON.stringify(subscribePressList);
writeFileSync('./server/data/subscribePressList.json', jsonData);
