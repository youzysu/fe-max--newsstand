import { dispatch } from '@store/index';
import { createElement } from '@utils/index';
import { CategoryPress } from 'types';
import styles from './FieldTab.module.css';

interface CategoryPressProps {
  categoryId: number;
  categoryPress: CategoryPress;
}

export default class CategoryTab {
  public readonly element = createElement('button', { class: styles.categoryTab });
  private progressBar = createElement('div', { class: styles.progressBar });
  private categoryName = createElement('span', { class: styles.categoryName });
  private categoryCount = createElement('span', { class: `${styles.hidden} ${styles.categoryCount}` });

  constructor() {
    this.element.append(this.progressBar, this.categoryName);
  }

  public renderSubscribedPress(pressName: string, index: number) {
    this.categoryName.textContent = pressName;
    this.element.dataset.pressId = index.toString();
    this.setSubscribedPressTabEvent();
  }

  public renderCategoryPress({ categoryId, categoryPress }: CategoryPressProps) {
    this.setCategoryName({ categoryId, categoryPress });
    this.setCategoryCount({ categoryPress });
    this.setCategoryTabEvent();
  }

  private setSubscribedPressTabEvent() {
    this.element.addEventListener(
      'click',
      () => dispatch({ type: 'CHANGE_SUBSCRIBE_PRESS_TAB', payload: { pressId: this.element.dataset.pressId! } }),
      { once: true }
    );
    this.element.addEventListener(
      'animationend',
      () => dispatch({ type: 'MOVE_SUBSCRIBE_PRESS_LIST', payload: { type: 'right' } }),
      { once: true }
    );
  }

  private setCategoryTabEvent() {
    this.element.addEventListener(
      'click',
      () => dispatch({ type: 'MOVE_CATEGORY', payload: { categoryId: this.element.dataset.categoryId! } }),
      { once: true }
    );
    this.element.addEventListener('animationend', () => dispatch({ type: 'MOVE_LIST', payload: { type: 'right' } }), {
      once: true,
    });
  }

  private setCategoryName({ categoryId, categoryPress }: { categoryId: number; categoryPress: CategoryPress }) {
    this.categoryName.textContent = categoryPress.categoryName;
    this.element.dataset.categoryId = categoryId.toString();
  }

  private setCategoryCount({ categoryPress }: { categoryPress: CategoryPress }) {
    const categoryCount = categoryPress.pressList.length;
    this.categoryCount.textContent = `/ ${categoryCount}`;
  }

  public activateCategory(pressIndex: number) {
    const pressIndexElement = createElement('span', { class: styles.pressIndex });
    pressIndexElement.textContent = `${pressIndex + 1} `;
    this.element.append(this.categoryCount);
    this.categoryCount.prepend(pressIndexElement);
    this.element.classList.add(styles.active);
    this.element.classList.add('title-sm');
  }

  public activatePress() {
    const activeMark = createElement('img', { class: styles.symbol, src: '/Symbol.svg' });
    this.element.append(activeMark);
    this.element.classList.add(styles.active);
    this.element.classList.add('title-sm');
  }

  public inActivate() {
    this.element.classList.remove(styles.active);
    this.element.classList.remove('title-sm');
  }
}
