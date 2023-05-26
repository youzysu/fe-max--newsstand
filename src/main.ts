import NewsStand from './components/NewsStand';
import { newsStandState } from './store';
import { register } from './store/newsStandReducer';
import './styles/style.css';
import { NewsStandState } from './types';

const main = () => {
  const app = document.querySelector<HTMLDivElement>('#app');
  if (!app) {
    throw new Error('App element is not found.');
  }

  const newsStand = new NewsStand(newsStandState);
  const updateNewsStand = (newState: NewsStandState) => {
    newsStand.updateState(newState);
  };

  register(updateNewsStand);

  app.append(newsStand.element);
};

main();
