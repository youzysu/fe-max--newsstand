export interface TrendNews {
  media: string;
  title: string;
  link: string;
}

export interface PressProps {
  src: string;
  alt: string;
}

export interface GridViewerPress {
  [key: number]: PressProps[];
}

export interface NewsStandState {
  systemDate: Date;
  trendNewsList: TrendNews[];
  leftNewsIndex: number;
  rightNewsIndex: number;
  tabOption: 'all' | 'subscribe';
  viewerOption: 'grid' | 'list';
  allPressList: PressProps[];
  gridPressStartIndex: number;
}

export interface Action {
  type: string;
  payload?: object;
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
  BUTTON: DefaultAttributeNames;
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
