export type LeftType = 'left';
export type RightType = 'right';

export interface PositionType {
  type: LeftType | RightType;
}

export interface TrendNews {
  media: string;
  title: string;
  link: string;
}

export interface PressInfo {
  icon: string;
  name: string;
}

export interface GridViewerPress {
  [key: number]: PressInfo[];
}

export interface SubscribePressList {
  [key: string]: boolean;
}

export interface CategoryPress {
  categoryName: string;
  pressList: PressArticleInfo[];
}

export interface PressArticleInfo {
  pressInfo: { icon: string; name: string };
  lastEdited: string;
  thumbnail: { img: string; title: string };
  mainArticle: { title: string; link: string };
  subArticleList: { title: string; link: string }[];
}

export type AllTab = 'all';
export type SubscribeTab = 'subscribe';
export type gridViewer = 'grid';
export type listViewer = 'list';

export type TabOption = AllTab | SubscribeTab;
export type ViewerOption = gridViewer | listViewer;

export interface NewsStandState {
  systemDate: Date;
  trendNewsList: TrendNews[];
  leftNewsIndex: number;
  rightNewsIndex: number;
  tabOption: TabOption;
  viewerOption: ViewerOption;
  pressIconList: PressInfo[];
  gridPressStartIndex: number;
  subscribePressList: SubscribePressList;
  categoryPressList: CategoryPress[];
  currentCategoryPress: currentCategoryPressInfo;
}

export interface currentCategoryPressInfo {
  categoryIndex: number;
  pressIndex: number;
}

export type Subscriber = (state: NewsStandState) => void;

export interface DefaultAttributeNames {
  class?: string;
  id?: string;
}

export interface HtmlAttributes {
  IMG: DefaultAttributeNames & {
    src?: string;
    alt?: string;
  };
  DIV: DefaultAttributeNames;
  SECTION: DefaultAttributeNames;
  BUTTON: DefaultAttributeNames & {
    'data-press-name'?: string;
  };
  TABLE: DefaultAttributeNames;
  TR: DefaultAttributeNames;
  TD: DefaultAttributeNames;
  A: DefaultAttributeNames & {
    href?: string;
  };
  SPAN: DefaultAttributeNames;
  HEADER: DefaultAttributeNames;
  H1: DefaultAttributeNames;
}
