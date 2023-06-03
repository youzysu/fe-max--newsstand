import { getState } from '@store/index';
import { createElement } from '@utils/index';
import { PressInfo } from 'types';
import { SubscribePressList } from './../../types/index';
import GridViewer from './GridViewer';
import GridButton from './GridViewer/GridButton';
import styles from './MediaArea.module.css';

interface MediaAreaProps {
  tabOption: 'all' | 'subscribe';
  viewerOption: 'grid' | 'list';
  pressList: PressInfo[];
  startIndex: number;
  subscribePressList: SubscribePressList;
}

export default class MediaArea {
  private element;
  private gridViewer;
  private leftButton: GridButton;
  private rightButton: GridButton;

  constructor() {
    this.element = createElement('DIV', { class: styles.mediaArea });
    this.gridViewer = new GridViewer();
    this.leftButton = new GridButton({ type: 'left' });
    this.rightButton = new GridButton({ type: 'right' });
    this.element.append(this.leftButton.getElement(), this.gridViewer.getElement(), this.rightButton.getElement());
    this.setEvent();
  }

  private setEvent() {
    window.addEventListener('beforeunload', () => {
      const subscribePressList = getState().subscribePressList;
      localStorage.setItem('subscribePressList', JSON.stringify(subscribePressList));
    });
  }

  public render(newState: MediaAreaProps) {
    const { tabOption, viewerOption, pressList, startIndex, subscribePressList } = newState;

    this.gridViewer.render({
      pressList: pressList,
      startIndex: startIndex,
      subscribePressList: subscribePressList,
    });
    this.leftButton.render({ startIndex: startIndex });
    this.rightButton.render({ startIndex: startIndex });
  }

  public getElement() {
    return this.element;
  }
}
