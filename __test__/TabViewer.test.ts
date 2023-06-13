import { expect, test } from 'vitest';
import TabViewer from './../src/components/TabViewer';

test('전체 언론사 그리드 보기일 때 전체 언론사, 그리드 보기 버튼만 active 클래스를 가진다.', () => {
  const tabViewerProps = {
    tabOption: 'all',
    viewerOption: 'grid',
  };
  const tabViewer = new TabViewer();
  tabViewer.render(tabViewerProps);

  expect(tabViewer.tab.allTabButton.className).toContain(['active']);
  expect(tabViewer.tab.subscribeTabButton.className).not.toContain(['active']);
  expect(tabViewer.viewer.gridViewerButton.className).toContain(['active']);
  expect(tabViewer.viewer.listViewerButton.className).not.toContain(['active']);
});
