import cors from 'cors';
import express from 'express';
import newsMedia from './data/newsMedia.json' assert { type: 'json' };
import trendNews from './data/trendNews.json' assert { type: 'json' };

const app = express();
const port = 3000;

app.use(cors());

app.get('/', (_, res) => res.status(200).send('Hello from express!'));
app.get('/trend', (_, res) => res.status(200).json(trendNews));
app.get('/media', (_, res) => res.status(200).json(newsMedia));

app.listen(port, () => console.log(`Server is listening on Port ${port}`));
