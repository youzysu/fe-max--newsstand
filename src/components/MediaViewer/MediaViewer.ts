import { createElement } from '@utils/index';
import { CategoryPress, PressArticleInfo, PressInfo, TabOption, ViewerOption, currentCategoryPressInfo } from 'types';
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
  pressArticleMap: Map<string, PressArticleInfo>;
  currentSubscribedPressIndex: number;
}

interface MediaViewerState {
  tabOption: TabOption | null;
  viewerOption: ViewerOption | null;
  startIndex: number | null;
  subscribePressList: SubscribePressList;
  categoryPressList: CategoryPress[] | [];
  currentCategoryPress: { categoryIndex: number | null; pressIndex: number | null };
  currentSubscribedPressIndex: number | null;
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
    currentSubscribedPressIndex: null,
  };

  public render(mediaViewerProps: MediaViewerProps) {
    const {
      tabOption,
      viewerOption,
      startIndex,
      subscribePressList,
      categoryPressList,
      currentCategoryPress,
      currentSubscribedPressIndex,
    } = mediaViewerProps;

    if (
      this.state.tabOption !== tabOption ||
      this.state.viewerOption !== viewerOption ||
      this.state.startIndex !== startIndex ||
      this.state.subscribePressList !== subscribePressList ||
      this.state.categoryPressList !== categoryPressList ||
      this.state.currentCategoryPress !== currentCategoryPress ||
      this.state.currentSubscribedPressIndex !== currentSubscribedPressIndex
    ) {
      this.renderViewer(mediaViewerProps);
      this.state = mediaViewerProps;
    }
  }

  private renderViewer(mediaViewerProps: MediaViewerProps) {
    const { viewerOption } = mediaViewerProps;
    switch (viewerOption) {
      case 'grid': {
        this.gridViewer.render(mediaViewerProps);
        this.dropPrevMediaViewer();
        this.element.appendChild(this.gridViewer.element);
        break;
      }
      case 'list': {
        this.listViewer.render(mediaViewerProps);
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
