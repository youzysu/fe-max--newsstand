import { GRID_PAGE_COUNT, PRESS_COUNT_OF_GRID_TABLE } from '@constant/index';
import { dispatch } from '@store/index';
import { createElement } from '@utils/index';
import { LeftType, RightType, TabOption, ViewerOption } from 'types';
import styles from './ViewerButton.module.css';

interface ViewerButtonProps {
  tabOption: TabOption;
  viewerOption: ViewerOption;
  startIndex: number;
}

interface ViewerButtonType {
  position: LeftType | RightType;
}

export default class ViewerButton {
  public readonly element;
  private readonly position: LeftType | RightType;
  private onClick: (() => void) | undefined;

  constructor({ position }: ViewerButtonType) {
    this.position = position;
    const isLeftType = position === 'left';
    const styleType = isLeftType ? styles.left : styles.right;
    this.element = createElement('BUTTON', { class: `${styles.viewerButton} ${styleType}` });
    this.setEvent();
  }

  private setEvent() {
    this.element.addEventListener('click', () => this.onClick?.());
  }

  public render({ tabOption, viewerOption, startIndex }: ViewerButtonProps) {
    const { position } = this;
    const onClickAction = {
      list: { all: 'MOVE_LIST', subscribe: 'MOVE_SUBSCRIBE_PRESS_LIST' },
      grid: { all: 'MOVE_GRID', subscribe: 'MOVE_SUBSCRIBE_PRESS_GRID' },
    };
    const actionType = onClickAction[viewerOption][tabOption];
    this.onClick = () => dispatch({ type: actionType, payload: { type: position } });

    const isFirstPage = startIndex === 0;
    const isLastPage = startIndex === PRESS_COUNT_OF_GRID_TABLE * (GRID_PAGE_COUNT - 1);
    const isLeft = position === 'left';
    const isRight = position === 'right';
    const hidden = (isLeft && isFirstPage) || (isRight && isLastPage);

    if (viewerOption === 'grid' && hidden) {
      this.element.classList.add(styles.disabled);
    } else {
      this.element.classList.remove(styles.disabled);
    }
  }
}
