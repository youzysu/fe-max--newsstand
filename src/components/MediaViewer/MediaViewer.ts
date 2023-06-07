import { dispatch } from '@store/index';
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
}

export default class MediaViewer {
  public readonly element = createElement('DIV');
  private gridViewer = new GridViewer();
  private listViewer = new ListViewer();
  private state: MediaViewerState = {
    tabOption: null,
    viewerOption: null,
    startIndex: null,
    subscribePressList: {},
  };

  constructor() {
    this.componentDidMount();
  }

  public render(mediaViewerProps: MediaViewerProps) {
    const { viewerOption, startIndex, subscribePressList } = mediaViewerProps;

    if (
      this.state.viewerOption !== viewerOption ||
      this.state.startIndex !== startIndex ||
      this.state.subscribePressList !== subscribePressList
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

  private componentDidMount() {
    dispatch({
      type: 'GET_SUBSCRIBE_PRESS_LIST',
      payload: { subscribePressList: JSON.parse(localStorage.getItem('subscribePressList') || '{}') },
    });
  }

  private dropPrevMediaViewer() {
    this.element.innerHTML = '';
  }
}
