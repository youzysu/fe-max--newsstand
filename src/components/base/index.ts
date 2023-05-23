/* eslint-disable @typescript-eslint/no-empty-function */
interface Props {
  [key: string]: string;
}

interface State {
  [key: string]: object;
}

export default class Component {
  element;
  props;
  state = {};

  constructor(htmlElement: HTMLElement, props?: Props) {
    this.element = htmlElement;
    this.props = props;
    this.setup();
  }

  setup() {
    this.state = this.initState();
    this.setEvent();
    this.render();
  }

  initState(): State {
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

  setState(newState: State) {
    this.state = { ...this.state, ...newState };
    this.render();
  }

  addEvent(eventType: string, selector: string, handler) {
    this.element.addEventListener(eventType, (event) => {
      if (!event.target?.closest(selector)) {
        return;
      }
      handler(event);
    });
  }
}
