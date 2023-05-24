/* eslint-disable @typescript-eslint/no-empty-function */
interface Props {
  [key: string]: string;
}

type EventHandler = (event: Event) => void;

export default class Component {
  element;
  props;
  state;

  constructor(htmlElement: HTMLElement, props?: Props) {
    this.element = htmlElement;
    this.props = props;
    this.setup();
  }

  async setup() {
    this.state = await this.initState();
    this.setEvent();
    this.render();
  }

  initState() {
    return {};
  }

  setEvent() {}

  render() {
    const template = this.getTemplate();
    this.element.append(...template);
  }

  getTemplate(): HTMLElement[] {
    return [];
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }

  addEvent(eventType: string, selector: string, handler: EventHandler) {
    this.element.addEventListener(eventType, (event) => {
      if (event.target instanceof HTMLElement && !event.target?.closest(selector)) {
        return;
      }
      handler(event);
    });
  }
}
