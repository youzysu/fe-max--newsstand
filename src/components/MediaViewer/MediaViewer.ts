import { dispatch, getState } from '@store/index';
import { createElement } from '@utils/index';
import { CategoryPress, PressInfo } from 'types';
import { SubscribePressList } from '../../types/index';
import GridViewer from './GridViewer';
import ListViewer from './ListViewer/ListViewer';

interface MediaViewerProps {
  tabOption: 'all' | 'subscribe';
  viewerOption: 'grid' | 'list';
  pressList: PressInfo[];
  startIndex: number;
  subscribePressList: SubscribePressList;
  categoryPressList: CategoryPress[];
  listViewerCategoryIndex: number;
}

interface MediaViewerState {
  tabOption: 'all' | 'subscribe' | null;
  viewerOption: 'grid' | 'list' | null;
  pressList: PressInfo[];
  startIndex: number | null;
  subscribePressList: SubscribePressList;
  categoryPressList: CategoryPress[];
  listViewerCategoryIndex: number | null;
}

export default class MediaViewer {
  private element = createElement('DIV');
  private gridViewer = new GridViewer();
  private listViewer = new ListViewer();
  private state: MediaViewerState = {
    tabOption: null,
    viewerOption: null,
    startIndex: null,
    pressList: [],
    subscribePressList: {},
    categoryPressList: [],
    listViewerCategoryIndex: null,
  };

  constructor() {
    this.setEvent();
    this.componentDidMount();
  }

  public render(mediaViewerProps: MediaViewerProps) {
    const { tabOption, viewerOption, startIndex, subscribePressList } = mediaViewerProps;

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
    const { viewerOption, pressList, startIndex, subscribePressList, categoryPressList, listViewerCategoryIndex } =
      mediaViewerProps;
    switch (viewerOption) {
      case 'grid': {
        this.gridViewer.render({ pressList, startIndex, subscribePressList });
        this.dropPrevMediaViewer();
        this.element.appendChild(this.gridViewer.getElement());
        break;
      }
      case 'list': {
        this.listViewer.render({ categoryPressList, listViewerCategoryIndex });
        this.dropPrevMediaViewer();
        this.element.appendChild(this.listViewer.getElement());
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

  private setEvent() {
    window.addEventListener('beforeunload', this.saveSubscribePressList);
  }

  private saveSubscribePressList() {
    const subscribePressList = getState().subscribePressList;
    localStorage.setItem('subscribePressList', JSON.stringify(subscribePressList));
  }

  private dropPrevMediaViewer() {
    this.element.innerHTML = '';
  }

  public getElement() {
    return this.element;
  }
}
