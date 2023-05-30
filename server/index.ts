import cors from 'cors';
import express from 'express';
import { SubscribePressList } from 'types';
import newsMedia from './data/newsMedia.json' assert { type: 'json' };
import trendNews from './data/trendNews.json' assert { type: 'json' };

const app = express();
const port = 3000;

app.use(cors({ origin: 'http://localhost:5173' }));

app.get('/', (_, res) => res.status(200).send('Hello from express!'));
app.get('/trend', (_, res) => res.status(200).json(trendNews));
app.get('/media', (_, res) => res.status(200).json(newsMedia));
app.get('/subscribe', (_, res) => {
  const makeSubscribePressList = (): SubscribePressList => {
    const mediaNameList = newsMedia.map((media) => {
      const { alt } = media;
      return alt;
    });
    const subscribePressList = mediaNameList.reduce(
      (subscribePressList: SubscribePressList, mediaName: string) => {
        subscribePressList[mediaName] = false;
        return subscribePressList;
      },
      {}
    );
    return subscribePressList;
  };
  const subscribePressList = makeSubscribePressList();
  res.status(200).json(subscribePressList);
});

app.listen(port, () => console.log(`Server is listening on Port ${port}`));
