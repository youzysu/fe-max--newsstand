import { GRID_PAGE_COUNT, PRESS_COUNT_OF_GRID_TABLE } from '@constant/index';
import { dispatch } from '@store/index';
import { createElement } from '@utils/index';
import { LeftType, RightType, TabOption, ViewerOption } from 'types';
import { MoveGridAction, MoveListAction, MoveSubscribePressListAction } from 'types/Action';
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
    this.element = createElement('button', { class: `${styles.viewerButton} ${styleType}` });
    this.setEvent();
  }

  private setEvent() {
    this.element.addEventListener('click', () => this.onClick?.());
  }

  public render({ tabOption, viewerOption, startIndex }: ViewerButtonProps) {
    const { position } = this;
    const moveListAction: MoveListAction = { type: 'MOVE_LIST', payload: { type: position } };
    const moveGridAction: MoveGridAction = { type: 'MOVE_GRID', payload: { type: position } };
    const moveSubscribePressListAction: MoveSubscribePressListAction = {
      type: 'MOVE_SUBSCRIBE_PRESS_LIST',
      payload: { type: position },
    };

    const onClickAction = {
      list: { all: moveListAction, subscribe: moveSubscribePressListAction },
      grid: { all: moveGridAction, subscribe: moveGridAction },
    } as const;
    const actionType = onClickAction[viewerOption][tabOption];
    this.onClick = () => dispatch(actionType);

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
