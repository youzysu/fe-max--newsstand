import { createElement } from '@utils/index';
import styles from './PressArticle.module.css';

interface MainArticleProps {
  thumbnail: { img: string; title: string };
  mainArticle: { title: string; link: string };
}

export default class MainArticle {
  public readonly element = createElement('DIV', { class: styles.mainArticle });
  private thumbnail = createElement('IMG', { class: styles.thumbnail });
  private title = createElement('A', { class: `body-md ${styles.mainTitle}` });

  constructor() {
    this.element.append(this.thumbnail, this.title);
  }

  public render({ thumbnail, mainArticle }: MainArticleProps) {
    this.thumbnail.setAttribute('src', thumbnail.img);
    this.thumbnail.setAttribute('alt', thumbnail.title);
    this.title.setAttribute('href', mainArticle.link);
    this.title.textContent = mainArticle.title;
  }
}
