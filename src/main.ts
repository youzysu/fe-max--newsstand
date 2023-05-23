import NewsStand from './components/NewsStand';
import './styles/style.css';
import { createElement } from './utils/createElement';

const app = document.querySelector<HTMLDivElement>('#app')!;
const newsStandElement = createElement('DIV', { class: 'newsStand' });
new NewsStand(newsStandElement);

app.append(newsStandElement);
