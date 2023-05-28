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
  TabOption: 'all' | 'subscribe';
  ViewerOption: 'grid' | 'list';
  allPressList: PressProps[];
  gridPressStartIndex: number;
}

export interface Action {
  type: string;
  payload?: object;
}

export type Subscriber = (state: NewsStandState) => void;
