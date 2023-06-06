import { fetchArticleList } from '@api/index';
import { thunkDispatch } from '@store/index';
import { createElement } from '@utils/index';
import ViewerButton from '../ViewerButton/ViewerButton';
import { CategoryPress } from './../../../types/index';
import styles from './ListViewer.module.css';

interface ListViewerProps {}

export default class ListViewer {
  private element = createElement('DIV', { class: styles.listViewer });
  private listView = new ListView();
  private leftButton = new ViewerButton({ position: 'left', viewerType: 'list' });
  private rightButton = new ViewerButton({ position: 'right', viewerType: 'list' });

  constructor() {
    this.element.append(this.leftButton.getElement(), this.listView.getElement(), this.rightButton.getElement());
    this.componentDidMount();
  }

  private componentDidMount() {
    thunkDispatch(fetchArticleList());
  }

  public render({ categoryPressList, listViewerCategoryIndex }) {
    this.listView.render({ categoryPressList, listViewerCategoryIndex });
  }

  public getElement() {
    return this.element;
  }
}

class ListView {
  private element = createElement('DIV', { class: styles.listView });
  private fieldTab = new FieldTab();
  private pressNews = new PressNews();

  constructor() {
    this.element.append(this.fieldTab.getElement(), this.pressNews.getElement());
  }

  public render({ categoryPressList, listViewerCategoryIndex }) {
    this.fieldTab.render({ categoryPressList, listViewerCategoryIndex });
    this.pressNews.render({ categoryPressList, listViewerCategoryIndex });
  }

  public getElement() {
    return this.element;
  }
}

class FieldTab {
  private CATEGORY_COUNT = 7;
  private element = createElement('DIV', { class: styles.listNavbar });
  private categoryTabs = Array.from({ length: this.CATEGORY_COUNT }, () =>
    createElement('DIV', { class: styles.categoryTab })
  );

  constructor() {
    this.element.append(...this.categoryTabs);
  }

  public render({ categoryPressList, listViewerCategoryIndex }) {
    this.setCategoryName({ categoryPressList });
    // this.activeCategoryTab({ listViewerCategoryIndex });
  }

  private setCategoryName({ categoryPressList }) {
    const categoryNames = categoryPressList.map((category: CategoryPress) => category.categoryName);
    this.categoryTabs.forEach((categoryTab, index) => (categoryTab.textContent = categoryNames[index]));
  }

  private activeCategoryTab({ listViewerCategoryIndex }) {
    this.categoryTabs.forEach((categoryTab, index) => {
      if (index === listViewerCategoryIndex) {
        categoryTab.classList.add(styles.active);
      } else {
        categoryTab.classList.remove(styles.active);
      }
    });
  }

  public getElement() {
    return this.element;
  }
}

class PressNews {
  private element = createElement('DIV', { class: styles.pressNews });

  constructor() {}

  public render({ categoryPressList, listViewerCategoryIndex }) {}

  public getElement() {
    return this.element;
  }
}
