import { dispatch } from '@store/index';
import { createElement } from '@utils/index';
import { CategoryPress } from 'types';
import styles from './FieldTab.module.css';

interface CategoryPressProps {
  categoryId: number;
  categoryPress: CategoryPress;
}

export default class CategoryTab {
  public readonly element = createElement('BUTTON', { class: styles.categoryTab });
  private categoryName = createElement('SPAN');
  private categoryCount = createElement('SPAN', { class: `${styles.hidden} ${styles.categoryCount}` });

  constructor() {
    this.element.append(this.categoryName, this.categoryCount);
    this.setEvent();
  }

  public render({ categoryId, categoryPress }: CategoryPressProps) {
    this.setCategoryName({ categoryId, categoryPress });
    this.setCategoryCount({ categoryPress });
  }

  private setEvent() {
    this.element.addEventListener('click', () =>
      dispatch({ type: 'MOVE_CATEGORY', payload: { categoryId: this.element.dataset.categoryId! } })
    );
  }

  private setCategoryName({ categoryId, categoryPress }: { categoryId: number; categoryPress: CategoryPress }) {
    this.categoryName.textContent = categoryPress.categoryName;
    this.element.dataset.categoryId = categoryId.toString();
  }

  private setCategoryCount({ categoryPress }: { categoryPress: CategoryPress }) {
    const categoryCount = categoryPress.pressList.length;
    this.categoryCount.textContent = `/ ${categoryCount}`;
  }

  public activate(pressIndex: number) {
    const pressIndexElement = createElement('SPAN', { class: styles.pressIndex });
    pressIndexElement.textContent = `${pressIndex + 1} `;
    this.categoryCount.prepend(pressIndexElement);
    this.element.classList.add(styles.active);
    this.element.classList.add('title-sm');
    this.categoryCount.classList.remove(styles.hidden);
  }

  public inActivate() {
    this.element.classList.remove(styles.active);
    this.element.classList.remove('title-sm');
    this.categoryCount.classList.add(styles.hidden);
  }
}
