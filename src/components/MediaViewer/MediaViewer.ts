import { createElement } from '@utils/index';
import { CategoryPress, PressInfo, TabOption, ViewerOption, currentCategoryPressInfo } from 'types';
import { SubscribePressList } from '../../types/index';
import GridViewer from './GridViewer';
import ListViewer from './ListViewer';

interface MediaViewerProps {
  tabOption: TabOption;
  viewerOption: ViewerOption;
  pressList: PressInfo[];
  startIndex: number;
  subscribePressList: SubscribePressList;
  categoryPressList: CategoryPress[];
  currentCategoryPress: currentCategoryPressInfo;
}

interface MediaViewerState {
  tabOption: TabOption | null;
  viewerOption: ViewerOption | null;
  startIndex: number | null;
  subscribePressList: SubscribePressList;
  categoryPressList: CategoryPress[] | [];
  currentCategoryPress: { categoryIndex: number | null; pressIndex: number | null };
}

export default class MediaViewer {
  public readonly element = createElement('DIV', { class: 'mediaViewer' });
  private gridViewer = new GridViewer();
  private listViewer = new ListViewer();
  private state: MediaViewerState = {
    tabOption: null,
    viewerOption: null,
    startIndex: null,
    subscribePressList: [],
    categoryPressList: [],
    currentCategoryPress: { categoryIndex: null, pressIndex: null },
  };

  public render(mediaViewerProps: MediaViewerProps) {
    const { viewerOption, startIndex, subscribePressList, categoryPressList, currentCategoryPress } = mediaViewerProps;

    if (
      this.state.viewerOption !== viewerOption ||
      this.state.startIndex !== startIndex ||
      this.state.subscribePressList !== subscribePressList ||
      this.state.categoryPressList !== categoryPressList ||
      this.state.currentCategoryPress !== currentCategoryPress
    ) {
      this.renderViewer(mediaViewerProps);
      this.state = mediaViewerProps;
    }
  }

  private renderViewer(mediaViewerProps: MediaViewerProps) {
    const { viewerOption, pressList, startIndex, subscribePressList, categoryPressList, currentCategoryPress } =
      mediaViewerProps;
    switch (viewerOption) {
      case 'grid': {
        this.gridViewer.render({ pressList, startIndex, subscribePressList });
        this.dropPrevMediaViewer();
        this.element.appendChild(this.gridViewer.element);
        break;
      }
      case 'list': {
        this.listViewer.render({ categoryPressList, currentCategoryPress, subscribePressList });
        this.dropPrevMediaViewer();
        this.element.appendChild(this.listViewer.element);
        break;
      }
    }
  }

  private dropPrevMediaViewer() {
    this.element.innerHTML = '';
  }
}
