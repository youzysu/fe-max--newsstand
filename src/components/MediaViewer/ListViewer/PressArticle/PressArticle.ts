import { createElement } from '@utils/index';
import { PressArticleInfo, SubscribePressList } from 'types';
import styles from './PressArticle.module.css';
import PressInfo from './PressInfo';

interface PressArticleProps {
  currentPress: PressArticleInfo;
  subscribePressList: SubscribePressList;
}

export default class PressArticle {
  public readonly element = createElement('DIV', { class: styles.pressArticle });
  private pressInfo = new PressInfo();

  constructor() {
    this.element.append(this.pressInfo.element);
  }

  public render({ currentPress, subscribePressList }: PressArticleProps) {
    this.pressInfo.render({ currentPress, subscribePressList });
  }
}
