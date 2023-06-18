import { dispatch } from '@store/index';
import { createElement } from '@utils/index';
import styles from './Modal.module.css';

export default class UnSubscribeModal {
  public readonly element = createElement('dialog', { class: styles.unsubscribeModal });
  private modalText = createElement('span', { class: `body-md ${styles.modalText}` });
  private buttonContainer = createElement('div', { class: styles.buttonContainer });
  private cancelButton = createElement('button', { class: styles.button });
  private confirmButton = createElement('button', { class: styles.button });
  private pressNameText = createElement('span', { class: `title-md ${styles.pressNameText}` });

  constructor() {
    this.setEvent();
    this.setModalText();
    this.setButtons();
    this.modalText.prepend(this.pressNameText);
    this.buttonContainer.append(this.confirmButton, this.cancelButton);
    this.element.append(this.modalText, this.buttonContainer);
  }

  private setButtons() {
    this.confirmButton.textContent = '예, 해지합니다';
    this.cancelButton.textContent = '아니오';
  }

  private setModalText() {
    const lineBreak = createElement('br');
    this.modalText.textContent = '을(를)';
    this.modalText.appendChild(lineBreak);
    this.modalText.appendChild(document.createTextNode('구독해지하시겠습니까?'));
  }

  private setEvent() {
    this.cancelButton.addEventListener('click', () => this.element.remove());
    this.confirmButton.addEventListener('click', () => {
      dispatch({ type: 'CHANGE_PRESS_SUBSCRIBING', payload: { pressName: this.pressNameText.textContent! } });
      this.element.remove();
    });
  }

  public render(pressName: string) {
    this.pressNameText.textContent = pressName;
  }
}
