import { createElement } from '@utils/index';
import styles from './PressArticle.module.css';

interface MainArticleProps {
  thumbnail: { img: string; title: string };
  mainArticle: { title: string; link: string };
}

export default class MainArticle {
  public readonly element = createElement('div', { class: styles.mainArticle });
  private thumbnail = createElement('div', { class: styles.thumbnail });
  private thumbnailImg = createElement('img', { class: styles.thumbnailImg });
  private title = createElement('a', { class: `body-md ${styles.mainTitle}` });

  constructor() {
    this.thumbnail.append(this.thumbnailImg);
    this.element.append(this.thumbnail, this.title);
  }

  public render({ thumbnail, mainArticle }: MainArticleProps) {
    this.thumbnailImg.setAttribute('src', thumbnail.img);
    this.thumbnailImg.setAttribute('alt', thumbnail.title);
    this.title.setAttribute('href', mainArticle.link);
    this.title.textContent = mainArticle.title;
  }
}
