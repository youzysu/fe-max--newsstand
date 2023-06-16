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

export type SubscribePressList = string[];

export interface ArticleInfo {
  title: string;
  link: string;
}

export interface PressArticleInfo {
  pressInfo: { icon: string; name: string };
  lastEdited: string;
  thumbnail: { img: string; title: string };
  mainArticle: ArticleInfo;
  subArticleList: ArticleInfo[];
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
  pressArticleMap: Map<string, PressArticleInfo>;
  currentSubscribedPressIndex: number;
}

export interface CategoryPress {
  categoryName: string;
  pressList: PressArticleInfo[];
}

export interface currentCategoryPressInfo {
  categoryIndex: number;
  pressIndex: number;
}

export type Subscriber = (state: NewsStandState) => void;

export interface DefaultAttributeNames {
  class?: string;
  id?: string;
  style?: string;
}

export interface HtmlAttributes {
  a: DefaultAttributeNames & {
    href?: string;
  };
  section: DefaultAttributeNames;
  ul: DefaultAttributeNames;
  li: DefaultAttributeNames;
  table: DefaultAttributeNames;
  tr: DefaultAttributeNames;
  td: DefaultAttributeNames;
  span: DefaultAttributeNames;
  abbr: DefaultAttributeNames;
  address: DefaultAttributeNames;
  area: DefaultAttributeNames;
  article: DefaultAttributeNames;
  aside: DefaultAttributeNames;
  audio: DefaultAttributeNames;
  b: DefaultAttributeNames;
  base: DefaultAttributeNames;
  bdi: DefaultAttributeNames;
  bdo: DefaultAttributeNames;
  blockquote: DefaultAttributeNames;
  body: DefaultAttributeNames;
  br: DefaultAttributeNames;
  button: DefaultAttributeNames;
  canvas: DefaultAttributeNames;
  caption: DefaultAttributeNames;
  cite: DefaultAttributeNames;
  code: DefaultAttributeNames;
  col: DefaultAttributeNames;
  colgroup: DefaultAttributeNames;
  data: DefaultAttributeNames;
  datalist: DefaultAttributeNames;
  dd: DefaultAttributeNames;
  del: DefaultAttributeNames;
  details: DefaultAttributeNames;
  dfn: DefaultAttributeNames;
  dialog: DefaultAttributeNames;
  div: DefaultAttributeNames;
  dl: DefaultAttributeNames;
  dt: DefaultAttributeNames;
  em: DefaultAttributeNames;
  embed: DefaultAttributeNames;
  fieldset: DefaultAttributeNames;
  figcaption: DefaultAttributeNames;
  figure: DefaultAttributeNames;
  footer: DefaultAttributeNames;
  form: DefaultAttributeNames;
  h1: DefaultAttributeNames;
  h2: DefaultAttributeNames;
  h3: DefaultAttributeNames;
  h4: DefaultAttributeNames;
  h5: DefaultAttributeNames;
  h6: DefaultAttributeNames;
  head: DefaultAttributeNames;
  header: DefaultAttributeNames;
  hgroup: DefaultAttributeNames;
  hr: DefaultAttributeNames;
  html: DefaultAttributeNames;
  i: DefaultAttributeNames;
  iframe: DefaultAttributeNames;
  img: DefaultAttributeNames & {
    src?: string;
    alt?: string;
  };
  input: DefaultAttributeNames;
  ins: DefaultAttributeNames;
  kbd: DefaultAttributeNames;
}
