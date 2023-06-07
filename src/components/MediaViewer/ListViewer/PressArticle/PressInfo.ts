import SubscribeButton from '@components/MediaViewer/SubscribeButton/SubscribeButton';
import { createElement } from '@utils/index';
import { PressArticleInfo, SubscribePressList } from 'types';
import styles from './PressArticle.module.css';

interface PressInfoProps {
  currentPress: PressArticleInfo;
  subscribePressList: SubscribePressList;
}

export default class PressInfo {
  public readonly element = createElement('DIV', { class: styles.pressInfo });
  private pressIcon = createElement('IMG', { class: styles.pressIcon });
  private lastEditedTime = createElement('SPAN', { class: `body-xs ${styles.lastEditedTime}` });
  private subscribeButton = new SubscribeButton();

  constructor() {
    this.element.append(this.pressIcon, this.lastEditedTime, this.subscribeButton.element);
  }

  public render({ currentPress, subscribePressList }: PressInfoProps) {
    const { pressInfo, lastEdited } = currentPress;
    const currentPressName = pressInfo.name;
    const isSubscribedPress = subscribePressList[currentPressName];

    this.setPressIcon(pressInfo);
    this.setLastEditedTime(lastEdited);
    this.setSubscribeButton(currentPressName, isSubscribedPress);
  }

  private setPressIcon(pressInfo: PressArticleInfo['pressInfo']) {
    this.pressIcon.setAttribute('src', pressInfo.icon);
  }

  private setLastEditedTime(lastEdited: PressArticleInfo['lastEdited']) {
    this.lastEditedTime.textContent = lastEdited;
  }

  private setSubscribeButton(pressName: string, isSubscribed: boolean) {
    this.subscribeButton.render({ pressName, isSubscribed });
  }
}
