import { dispatch, getState } from '@store/index';
import { createElement } from '@utils/index';
import { PressArticleInfo, SubscribePressList } from 'types';
import subscribeButtonStyles from '../../SubscribeButton/SubscribeButton.module.css';
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
  private snackbar = createElement('DIV', { class: `body-md ${styles.snackbar}` });

  constructor() {
    this.setSnackbar();
    this.setEvent();
    this.article.append(this.mainArticle.element, this.subArticle.element);
    this.element.append(this.pressInfo.element, this.article);
  }

  public render({ currentPress, subscribePressList }: PressArticleProps) {
    this.pressInfo.render({ currentPress, subscribePressList });
    this.renderMainArticle(currentPress);
    this.renderSubArticle(currentPress);
  }

  private setEvent() {
    this.element.addEventListener('click', (e) => this.showSnackbar(e.target as HTMLElement));
  }

  private showSnackbar(target: HTMLElement) {
    if (target.classList.contains(`${subscribeButtonStyles.subscribed}`)) {
      this.element.append(this.snackbar);
      setTimeout(() => this.moveSubscribeTab(), 5000);
    }
  }

  private moveSubscribeTab() {
    const { subscribePressList } = getState();
    const lastPressIndex = subscribePressList.length - 1;
    this.snackbar.remove();
    dispatch({ type: 'CHANGE_SUBSCRIBE_PRESS_TAB', payload: { pressId: lastPressIndex.toString() } });
  }

  private setSnackbar() {
    this.snackbar.textContent = '내가 구독한 언론사에 추가되었습니다.';
  }

  private renderMainArticle({ thumbnail, mainArticle }: PressArticleInfo) {
    this.mainArticle.render({ thumbnail, mainArticle });
  }

  private renderSubArticle({ pressInfo, subArticleList }: PressArticleInfo) {
    const pressName = pressInfo.name;
    this.subArticle.render({ pressName, subArticleList });
  }
}
