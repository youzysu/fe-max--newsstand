import { CategoryPress, currentCategoryPressInfo } from 'types';

export function getPrevCategoryPress(
  currentCategoryPress: currentCategoryPressInfo,
  categoryPressList: CategoryPress[]
) {
  const { categoryIndex, pressIndex } = currentCategoryPress;

  const isFirstPress = pressIndex === 0;
  const isFirstCategory = categoryIndex === 0;
  const lastCategoryIndex = categoryPressList.length - 1;

  let updatedCategoryIndex = categoryIndex;
  let updatedPressIndex = pressIndex;

  if (isFirstPress) {
    if (isFirstCategory) {
      updatedCategoryIndex = lastCategoryIndex;
      updatedPressIndex = categoryPressList[lastCategoryIndex].pressList.length - 1;
    } else {
      updatedCategoryIndex -= 1;
      updatedPressIndex = categoryPressList[updatedCategoryIndex].pressList.length - 1;
    }
  } else {
    updatedPressIndex -= 1;
  }

  return {
    categoryIndex: updatedCategoryIndex,
    pressIndex: updatedPressIndex,
  };
}

export function getNextCategoryPress(
  currentCategoryPress: currentCategoryPressInfo,
  categoryPressList: CategoryPress[]
) {
  const { categoryIndex, pressIndex } = currentCategoryPress;

  const isLastPress = pressIndex === categoryPressList[categoryIndex].pressList.length - 1;
  const isLastCategory = categoryIndex === categoryPressList.length - 1;

  let updatedCategoryIndex = categoryIndex;
  let updatedPressIndex = pressIndex;

  if (isLastPress) {
    if (isLastCategory) {
      updatedCategoryIndex = 0;
    } else {
      updatedCategoryIndex += 1;
    }
    updatedPressIndex = 0;
  } else {
    updatedPressIndex += 1;
  }

  return {
    pressIndex: updatedPressIndex,
    categoryIndex: updatedCategoryIndex,
  };
}
