import { createElement } from '@utils/index';
import { CategoryPress, SubscribePressList, TabOption, currentCategoryPressInfo } from 'types';
import CategoryTab from './CategoryTab';
import styles from './FieldTab.module.css';

interface FieldTabProps {
  tabOption: TabOption;
  categoryPressList: CategoryPress[];
  currentCategoryPress: currentCategoryPressInfo;
  subscribePressList: SubscribePressList;
  currentSubscribedPressIndex: number;
}

export default class FieldTab {
  public readonly element = createElement('div', { class: `${styles.fieldTab} body-sm` });

  public render({
    tabOption,
    categoryPressList,
    currentCategoryPress,
    subscribePressList,
    currentSubscribedPressIndex,
  }: FieldTabProps) {
    this.dropPrevFieldTab();

    switch (tabOption) {
      case 'all': {
        this.renderCategoryPress({ categoryPressList, currentCategoryPress });
        break;
      }
      case 'subscribe': {
        this.renderSubscribedPress(subscribePressList, currentSubscribedPressIndex);
        break;
      }
    }
  }

  private renderCategoryPress({
    categoryPressList,
    currentCategoryPress,
  }: {
    categoryPressList: CategoryPress[];
    currentCategoryPress: currentCategoryPressInfo;
  }) {
    const categoryPressCount = categoryPressList.length;
    const categoryTabs = Array.from({ length: categoryPressCount }, () => new CategoryTab());
    categoryTabs.forEach((categoryTab, index) => {
      categoryTab.renderCategoryPress({ categoryId: index, categoryPress: categoryPressList[index] });
    });

    this.setCategoryTabActivation(categoryTabs, currentCategoryPress);
    this.element.append(...categoryTabs.map((categoryTab) => categoryTab.element));
  }

  private renderSubscribedPress(subscribePressList: SubscribePressList, currentSubscribedPressIndex: number) {
    const categoryPressCount = subscribePressList.length;
    const categoryTabs = Array.from({ length: categoryPressCount }, () => new CategoryTab());
    categoryTabs.forEach((categoryTab, index) => {
      categoryTab.renderSubscribedPress(subscribePressList[index], index);
    });

    this.setSubscribePressTabActivation(categoryTabs, currentSubscribedPressIndex);
    this.element.append(...categoryTabs.map((categoryTab) => categoryTab.element));
  }

  private setSubscribePressTabActivation(categoryTabs: CategoryTab[], currentSubscribedPressIndex: number) {
    categoryTabs.forEach((categoryTab, index) => {
      index !== currentSubscribedPressIndex && categoryTab.inActivate();
      index === currentSubscribedPressIndex && categoryTab.activatePress();
    });
  }

  private setCategoryTabActivation(
    categoryTabs: CategoryTab[],
    { categoryIndex, pressIndex }: currentCategoryPressInfo
  ) {
    categoryTabs.forEach((categoryTab, index) => {
      index !== categoryIndex && categoryTab.inActivate();
      index === categoryIndex && categoryTab.activateCategory(pressIndex);
    });
  }

  private dropPrevFieldTab() {
    this.element.innerHTML = '';
  }
}
