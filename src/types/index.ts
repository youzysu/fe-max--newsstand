export interface TrendNewsList {
  left: TrendNews[];
  right: TrendNews[];
}

export interface TrendNews {
  press: string;
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
  trendNewsList: TrendNewsList;
  leftNewsIndex: number;
  rightNewsIndex: number;
  TabOption: 'all' | 'subscribe';
  ViewerOption: 'grid' | 'list';
  allPressList: PressProps[];
  gridViewerPress: GridViewerPress;
  gridPageIndex: number;
}
