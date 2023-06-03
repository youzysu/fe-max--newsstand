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

export interface NewsStandState {
  systemDate: Date;
  trendNewsList: TrendNews[];
  leftNewsIndex: number;
  rightNewsIndex: number;
  tabOption: 'all' | 'subscribe';
  viewerOption: 'grid' | 'list';
  allPressList: PressInfo[];
  gridPressStartIndex: number;
  subscribePressList: SubscribePressList | [];
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
