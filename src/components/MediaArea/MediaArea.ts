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
  private leftButton;
  private rightButton;

  constructor(private props: MediaAreaProps) {
    this.element = createElement('DIV', { class: styles.mediaArea });
    this.gridViewer = new GridViewer({
      pressList: this.props.pressList,
      startIndex: this.props.startIndex,
      subscribePressList: this.props.subscribePressList,
    });
    this.leftButton = new GridButton({ startIndex: this.props.startIndex, type: 'left' });
    this.rightButton = new GridButton({ startIndex: this.props.startIndex, type: 'right' });
    this.render();
  }

  public updateProps(newState: MediaAreaProps) {
    this.gridViewer.updateProps({
      pressList: newState.pressList,
      startIndex: newState.startIndex,
      subscribePressList: newState.subscribePressList,
    });
    this.leftButton.updateProps({ startIndex: newState.startIndex, type: 'left' });
    this.rightButton.updateProps({ startIndex: newState.startIndex, type: 'right' });
  }

  private render() {
    this.element.append(this.leftButton.getElement(), this.gridViewer.getElement(), this.rightButton.getElement());
  }

  public getElement() {
    return this.element;
  }
}
