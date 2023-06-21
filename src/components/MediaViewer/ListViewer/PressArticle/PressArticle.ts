import { createElement } from '@utils/index';
import { PressArticleInfo, SubscribePressList } from 'types';
import MainArticle from './MainArticle';
import styles from './PressArticle.module.css';
import PressInfo from './PressInfo';
import SubArticle from './SubArticle';

interface PressArticleProps {
  currentPress: PressArticleInfo;
  subscribePressList: SubscribePressList;
}

export default class PressArticle {
  public readonly element = createElement('div', { class: styles.pressArticle });
  private pressInfo = new PressInfo();
  private article = createElement('article', { class: styles.article });
  private mainArticle = new MainArticle();
  private subArticle = new SubArticle();

  constructor() {
    this.article.append(this.mainArticle.element, this.subArticle.element);
    this.element.append(this.pressInfo.element, this.article);
  }

  public render({ currentPress, subscribePressList }: PressArticleProps) {
    this.pressInfo.render({ currentPress, subscribePressList });
    this.renderMainArticle(currentPress);
    this.renderSubArticle(currentPress);
  }

  private renderMainArticle({ thumbnail, mainArticle }: PressArticleInfo) {
    this.mainArticle.render({ thumbnail, mainArticle });
  }

  private renderSubArticle({ pressInfo, subArticleList }: PressArticleInfo) {
    const pressName = pressInfo.name;
    this.subArticle.render({ pressName, subArticleList });
  }
}
