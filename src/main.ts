import NewsStand from './components/NewsStand';
import store from './store';
import './styles/style.css';

const main = () => {
  const app = document.querySelector<HTMLDivElement>('#app');
  if (!app) {
    throw new Error('App element is not found.');
  }

  const newsStand = new NewsStand(store);
  app.append(newsStand.element);
};

main();
