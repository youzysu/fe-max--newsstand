import { GridViewerPress, PressProps } from '../types';

export function chunkPress(allPressList: PressProps[]): GridViewerPress {
  const chunkSize = 24;
  const chunkedPressNewsData = allPressList.reduce(
    (result: GridViewerPress, pressData: PressProps, idx: number) => {
      const rowIndex = Math.floor(idx / chunkSize);

      if (!result[rowIndex]) {
        result[rowIndex] = [];
      }
      result[rowIndex].push(pressData);

      return result;
    },
    []
  );

  return chunkedPressNewsData;
}
