import { HtmlAttributes, NewsStandState } from '../types';

export function createElement<TTagName extends keyof HtmlAttributes>(
  tagName: TTagName,
  attributes?: HtmlAttributes[TTagName]
): HTMLElement {
  const element = document.createElement(tagName);
  if (attributes) {
    Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
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
