import SubscribeButton from '@components/MediaViewer/SubscribeButton/SubscribeButton';
import { createElement } from '@utils/index';
import { PressArticleInfo, SubscribePressList, TabOption } from 'types';
import styles from './PressArticle.module.css';

interface PressInfoProps {
  tabOption: TabOption;
  currentPress: PressArticleInfo;
  subscribePressList: SubscribePressList;
}

export default class PressInfo {
  public readonly element = createElement('DIV', { class: styles.pressInfo });
  private pressIcon = createElement('IMG', { class: styles.pressIcon });
  private lastEditedTime = createElement('SPAN', { class: `body-xs ${styles.lastEditedTime}` });
  public readonly subscribeButton = new SubscribeButton();

  constructor() {
    this.element.append(this.pressIcon, this.lastEditedTime, this.subscribeButton.element);
  }

  public render({ tabOption, currentPress, subscribePressList }: PressInfoProps) {
    const { pressInfo, lastEdited } = currentPress;
    const currentPressName = pressInfo.name;
    const isSubscribedPress = subscribePressList.includes(currentPressName);

    this.setPressIcon(pressInfo);
    this.setLastEditedTime(lastEdited);
    this.setSubscribeButton(tabOption, currentPressName, isSubscribedPress);
  }

  private setPressIcon(pressInfo: PressArticleInfo['pressInfo']) {
    this.pressIcon.setAttribute('src', pressInfo.icon);
  }

  private setLastEditedTime(lastEdited: PressArticleInfo['lastEdited']) {
    this.lastEditedTime.textContent = lastEdited;
  }

  private setSubscribeButton(tabOption: TabOption, pressName: string, isSubscribed: boolean) {
    this.subscribeButton.render({ tabOption, pressName, isSubscribed });
  }
}
