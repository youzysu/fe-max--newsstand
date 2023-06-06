export interface PositionType {
  type: 'left' | 'right';
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
  pressList: PressList[];
}

interface PressList {
  pressInfo: { icon: string; name: string };
  lastEdited: string;
  thumbnail: { img: string; title: string };
  mainArticle: { title: string; link: string };
  subArticleList: { title: string; link: string }[];
}

export interface NewsStandState {
  systemDate: Date;
  trendNewsList: TrendNews[];
  leftNewsIndex: number;
  rightNewsIndex: number;
  tabOption: 'all' | 'subscribe';
  viewerOption: 'grid' | 'list';
  pressIconList: PressInfo[];
  gridPressStartIndex: number;
  subscribePressList: SubscribePressList | [];
  categoryPressList: CategoryPress[];
  listViewerCategoryIndex: number;
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
