import { createElement } from '@utils/index';
import { ArticleInfo } from 'types';
import styles from './PressArticle.module.css';

interface SubArticleProps {
  pressName: string;
  subArticleList: ArticleInfo[];
}

export default class SubArticle {
  public readonly element = createElement('DIV');
  private SUB_ARTICLE_COUNT = 6;
  private articleList = createElement('UL', { class: `body-md ${styles.articleList}` });
  private articleListItems = Array.from({ length: this.SUB_ARTICLE_COUNT }, () => createElement('LI'));
  private articleLinks = Array.from({ length: this.SUB_ARTICLE_COUNT }, () => createElement('A'));
  private caption = createElement('SPAN', { class: `body-sm ${styles.caption}` });

  constructor() {
    this.articleList.append(...this.articleListItems);
    this.articleListItems.forEach((articleItem, index) => articleItem.append(this.articleLinks[index]));
    this.element.append(this.articleList, this.caption);
  }

  public render({ pressName, subArticleList }: SubArticleProps) {
    this.articleLinks.forEach((articleLink, index) => {
      const { title, link } = subArticleList[index];
      articleLink.setAttribute('href', link);
      articleLink.textContent = title;
    });
    this.caption.textContent = `${pressName} 언론사에서 직접 편집한 뉴스입니다.`;
  }
}
