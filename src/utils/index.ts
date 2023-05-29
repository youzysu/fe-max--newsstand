import { NewsStandState } from '../types';

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

export function deepFreeze(target: NewsStandState) {
  if (target && typeof target === 'object' && !Object.isFrozen(target)) {
    Object.freeze(target);
    Object.getOwnPropertyNames(target).forEach((prop) => deepFreeze(target[prop]));
  }
  return target;
}
