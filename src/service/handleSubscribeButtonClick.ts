import styles from '@components/MediaViewer/Modal/Modal.module.css';
import UnsubscribeModal from '@components/MediaViewer/Modal/SubscribeCancelModal';
import subscribeButtonStyles from '@components/MediaViewer/SubscribeButton/SubscribeButton.module.css';
import newsStandStyles from '@components/newsStand.module.css';
import { dispatch, getState } from '@store/index';
import { createElement } from '@utils/index';

export default function handleSubscribeButtonClick() {
  document.addEventListener('click', (e) => {
    if (!(e.target instanceof HTMLElement)) {
      return;
    }
    if (!e.target || !e.target.classList.contains(subscribeButtonStyles.subscribe)) {
      return;
    }

    const pressName = e.target.getAttribute('data-press-name');
    const { tabOption, viewerOption, subscribePressList } = getState();
    const isSubscribedPress = pressName && subscribePressList.includes(pressName);

    const onClickAction = {
      list: {
        all: isSubscribedPress
          ? (pressName: string) => dispatch({ type: 'CHANGE_PRESS_SUBSCRIBING', payload: { pressName } })
          : showSubscribeSnackbar,
        subscribe: showUnsubscribeModal,
      },
      grid: {
        all: (pressName: string) => dispatch({ type: 'CHANGE_PRESS_SUBSCRIBING', payload: { pressName } }),
        subscribe: showUnsubscribeModal,
      },
    };

    const clickEventHandler = onClickAction[viewerOption][tabOption];
    clickEventHandler(pressName!);
  });
}

function showSubscribeSnackbar(pressName: string) {
  dispatch({ type: 'CHANGE_PRESS_SUBSCRIBING', payload: { pressName } });

  const newsStand = document.querySelector(`.${newsStandStyles.newsStand}`);
  const snackbar = makeSnackbar();
  newsStand?.append(snackbar);
  snackbar.show();

  setTimeout(() => {
    snackbar.remove();
    const { subscribePressList } = getState();
    const lastPressIndex = subscribePressList.length - 1;
    dispatch({ type: 'CHANGE_SUBSCRIBE_PRESS_TAB', payload: { pressId: lastPressIndex.toString() } });
  }, 5000);
}

function makeSnackbar() {
  const snackbar = createElement('dialog', { class: `body-md ${styles.snackbar}` });
  snackbar.textContent = '내가 구독한 언론사에 추가되었습니다.';
  return snackbar;
}

function showUnsubscribeModal(pressName: string) {
  const newsStand = document.querySelector(`.${newsStandStyles.newsStand}`);
  const unsubscribeModal = new UnsubscribeModal();

  unsubscribeModal.render(pressName);
  newsStand?.append(unsubscribeModal.element);
}
