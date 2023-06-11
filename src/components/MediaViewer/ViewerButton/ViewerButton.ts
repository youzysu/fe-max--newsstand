import { GRID_PAGE_COUNT, PRESS_COUNT_OF_GRID_TABLE } from '@constant/index';
import { dispatch } from '@store/index';
import { createElement } from '@utils/index';
import { LeftType, RightType, ViewerOption } from 'types';
import styles from './ViewerButton.module.css';

interface GridButtonProps {
  startIndex: number;
}

interface ViewerButtonType {
  position: LeftType | RightType;
  viewerType: ViewerOption;
}

export default class ViewerButton {
  public readonly element;
  private position;

  constructor({ position, viewerType }: ViewerButtonType) {
    this.position = position;
    const isLeftType = this.position === 'left';
    const styleType = isLeftType ? styles.left : styles.right;
    this.element = createElement('BUTTON', { class: `${styles.viewerButton} ${styleType}` });
    this.setEvent(viewerType);
  }

  private setEvent(viewerType: ViewerButtonType['viewerType']) {
    switch (viewerType) {
      case 'grid':
        this.element.addEventListener('click', () => dispatch({ type: 'MOVE_GRID', payload: { type: this.position } }));
        break;
      case 'list':
        this.element.addEventListener('click', () => dispatch({ type: 'MOVE_LIST', payload: { type: this.position } }));
        break;
    }
  }

  public render({ startIndex }: GridButtonProps) {
    const isFirstPage = startIndex === 0;
    const isLastPage = startIndex === PRESS_COUNT_OF_GRID_TABLE * (GRID_PAGE_COUNT - 1);
    const isLeft = this.position === 'left';
    const isRight = this.position === 'right';

    if ((isLeft && isFirstPage) || (isRight && isLastPage)) {
      this.element.classList.add(styles.disabled);
    } else {
      this.element.classList.remove(styles.disabled);
    }
  }
}
