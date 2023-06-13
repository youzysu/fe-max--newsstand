import { expect, test } from 'vitest';
import TabViewer from './../src/components/TabViewer';

test('TabViewer UI 테스트', () => {
  const tabViewerProps = {
    tabOption: 'all',
    viewerOption: 'grid',
  };
  const tabViewer = new TabViewer();
  tabViewer.render(tabViewerProps);
  expect(tabViewer.element.innerHTML).toEqual(
    '<div class="_tab_1o26m_1"><button class="title-md _active_1o26m_20">전체 언론사</button><button class="body-md">내가 구독한 언론사</button></div><div class="_viewer_1o26m_24"><button class="_listViewerButton_1o26m_39"></button><button class="_gridViewerButton_1o26m_30 _active_1o26m_20"></button></div>'
  );
});
