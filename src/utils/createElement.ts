interface attributes {
  [name: string]: string;
}

export function createElement(tagName: string, attributes?: attributes): HTMLElement {
  const element = document.createElement(tagName);
  if (attributes) {
    Object.keys(attributes).forEach((name) => element.setAttribute(name, attributes[name]));
  }

  return element;
}
