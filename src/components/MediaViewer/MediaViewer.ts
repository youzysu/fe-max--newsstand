import { createElement } from '@utils/index';
import { CategoryPress, PressArticleInfo, PressInfo, TabOption, ViewerOption, currentCategoryPressInfo } from 'types';
import { SubscribePressList } from '../../types/index';
import GridViewer from './GridViewer';
import ListViewer from './ListViewer';
import styles from './MediaViewer.module.css';
import ViewerButton from './ViewerButton/ViewerButton';

interface MediaViewerProps {
  tabOption: TabOption;
  viewerOption: ViewerOption;
  pressList: PressInfo[];
  startIndex: number;
  subscribePressList: SubscribePressList;
  categoryPressList: CategoryPress[];
  currentCategoryPress: currentCategoryPressInfo;
  pressArticleMap: Map<string, PressArticleInfo>;
  currentSubscribedPressIndex: number;
}

export default class MediaViewer {
  public readonly element = createElement('div', { class: styles.mediaViewer });
  private gridViewer = new GridViewer();
  private listViewer = new ListViewer();
  private leftButton = new ViewerButton({
    position: 'left',
  });
  private rightButton = new ViewerButton({
    position: 'right',
  });
  private currentViewer: GridViewer | ListViewer | null = null;

  constructor() {
    this.element.append(this.leftButton.element, this.rightButton.element);
  }

  public render(mediaViewerProps: MediaViewerProps) {
    const viewer = {
      grid: this.gridViewer,
      list: this.listViewer,
    };
    const { viewerOption } = mediaViewerProps;
    this.currentViewer = viewer[viewerOption];

    this.currentViewer.render(mediaViewerProps);
    this.leftButton.render(mediaViewerProps);
    this.rightButton.render(mediaViewerProps);

    this.dropPrevViewer();
    this.element.append(this.leftButton.element, this.currentViewer.element, this.rightButton.element);
  }

  private dropPrevViewer() {
    this.element.innerHTML = '';
  }
}
