import { createElement } from '@utils/index';
import { CategoryPress } from 'types';
import styles from './ListViewer.module.css';

export default class CategoryTab {
  private element = createElement('BUTTON', { class: styles.categoryTab });
  private categoryName = createElement('SPAN');
  private categoryCount = createElement('SPAN', { class: styles.hidden });

  constructor() {
    this.element.append(this.categoryName, this.categoryCount);
  }

  public render({ categoryPress }: { categoryPress: CategoryPress }) {
    this.setCategoryName({ categoryPress });
    this.setCategoryCount({ categoryPress });
  }

  private setCategoryName({ categoryPress }: { categoryPress: CategoryPress }) {
    this.categoryName.textContent = categoryPress.categoryName;
  }

  private setCategoryCount({ categoryPress }: { categoryPress: CategoryPress }) {
    const categoryCount = categoryPress.pressList.length;
    this.categoryCount.textContent = `/ ${categoryCount}`;
  }

  private activate() {
    this.element.classList.add(styles.active);
    this.element.classList.add('title-sm');
  }

  private inActivate() {
    this.element.classList.remove(styles.active);
    this.element.classList.remove('title-sm');
  }

  public getElement() {
    return this.element;
  }
}
