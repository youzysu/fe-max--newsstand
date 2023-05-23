interface attributes {
  [name: string]: string;
}

export const createElement = (tagName: string, attributes?: attributes): HTMLElement => {
  const element = document.createElement(tagName);
  if (attributes) {
    Object.keys(attributes).forEach((name) => element.setAttribute(name, attributes[name]));
  }

  return element;
};
