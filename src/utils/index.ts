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
    Object.entries(target).forEach(([_, value]) => deepFreeze(value));
  }
  return target;
}

export function shuffleArray<T>(array: T[]) {
  const result = [...array];

  // 마지막 요소부터 최소 한번씩은 그 이전과 swap 되도록 한다.
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // 0 ~ i 사이의 임의의 수
    [result[i], result[j]] = [result[j], result[i]]; // i와 j를 swap
  }

  return result;
}
