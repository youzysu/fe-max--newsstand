export interface TrendNewsList {
  left: TrendNews[];
  right: TrendNews[];
}

export interface TrendNews {
  media: string;
  title: string;
  link: string;
}

export interface NewsStandState {
  systemDate: Date;
  trendNewsList: TrendNewsList;
  leftNewsIndex: number;
  rightNewsIndex: number;
}
