interface trendNews {
  media: string;
  title: string;
}

interface NewsStandStore {
  systemDate: Date;
  trendNewsList: trendNews[];
}

export const store: NewsStandStore = {
  systemDate: new Date(),
  trendNewsList: [],
};
