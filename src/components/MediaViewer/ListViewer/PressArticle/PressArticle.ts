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
  public readonly element = createElement('DIV', { class: styles.pressArticle });
  private pressInfo = new PressInfo();
  private article = createElement('ARTICLE', { class: styles.article });
  private mainArticle = new MainArticle();
  private subArticle = new SubArticle();

  constructor() {
    this.article.append(this.mainArticle.element, this.subArticle.element);
    this.element.append(this.pressInfo.element, this.article);
  }

  public render({ currentPress, subscribePressList }: PressArticleProps) {
    this.pressInfo.render({ currentPress, subscribePressList });
    this.setMainArticle(currentPress);
    this.setSubArticle(currentPress);
  }

  private setMainArticle({ thumbnail, mainArticle }: PressArticleInfo) {
    this.mainArticle.render({ thumbnail, mainArticle });
  }

  private setSubArticle({ pressInfo, subArticleList }: PressArticleInfo) {
    const pressName = pressInfo.name;
    this.subArticle.render({ pressName, subArticleList });
  }
}
