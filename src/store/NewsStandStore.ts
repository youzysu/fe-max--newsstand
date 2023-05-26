import { NewsStandState } from '../types';

export const initialState: NewsStandState = {
  systemDate: new Date(),
  trendNewsList: {
    left: [
      {
        press: '연합뉴스',
        title: '김성태와 공모해 대북송금, 안부수 아태협 회장 징역 3년6월',
        link: 'https://news.naver.com/main/list.naver?mode=LPOD&mid=sec&sid1=001&sid2=140&oid=001&isYeonhapFlash=Y&aid=0013959011',
      },
      {
        press: '연합뉴스',
        title: '국가자격시험서 어이없는 사고…채점 안한 609명 답안지 파쇄',
        link: 'https://news.naver.com/main/list.naver?mode=LPOD&mid=sec&sid1=001&sid2=140&oid=001&isYeonhapFlash=Y&aid=0013958483',
      },
      {
        press: '연합뉴스',
        title: '누리호, 하늘 향해 섰다…발사 하루전 준비 순조로워',
        link: 'https://news.naver.com/main/list.naver?mode=LPOD&mid=sec&sid1=001&sid2=140&oid=001&isYeonhapFlash=Y&aid=0013958370',
      },
      {
        press: '연합뉴스',
        title: '"역사는 더디지만 진보"…노 전 대통령 서거 14주기 추도식 엄수',
        link: 'https://news.naver.com/main/list.naver?mode=LPOD&mid=sec&sid1=001&sid2=140&oid=001&isYeonhapFlash=Y&aid=0013959129',
      },
      {
        press: '연합뉴스',
        title: '로또 1등 당첨금까지 은닉…국세청, 고액체납자 557명 집중추적',
        link: 'https://news.naver.com/main/list.naver?mode=LPOD&mid=sec&sid1=001&sid2=140&oid=001&isYeonhapFlash=Y&aid=0013958976',
      },
    ],
    right: [
      {
        press: '연합뉴스',
        title: '조태용 "北, 가까운 장래에 정찰위성 발사 가능성"',
        link: 'https://news.naver.com/main/list.naver?mode=LPOD&mid=sec&sid1=001&sid2=140&oid=001&isYeonhapFlash=Y&aid=0013959330',
      },
      {
        press: '연합뉴스',
        title: '외교부, \'중국서 네이버 접속 차단\' 보도에 "유관기관과 확인중"',
        link: 'https://news.naver.com/main/list.naver?mode=LPOD&mid=sec&sid1=001&sid2=140&oid=001&isYeonhapFlash=Y&aid=0013959306',
      },
      {
        press: '연합뉴스',
        title: '"다이어트약 오픈런" 의원들 점검했더니 "마약류 과다처방"',
        link: 'https://news.naver.com/main/list.naver?mode=LPOD&mid=sec&sid1=001&sid2=140&oid=001&isYeonhapFlash=Y&aid=0013959297',
      },
      {
        press: '연합뉴스',
        title: '검 "KH 배상윤, 동남아 카지노서 수백억 쓰며 황제도피"',
        link: 'https://news.naver.com/main/list.naver?mode=LPOD&mid=sec&sid1=001&sid2=140&oid=001&isYeonhapFlash=Y&aid=0013959271',
      },
      {
        press: '연합뉴스',
        title: '부동산 중개수수료 할인 막았나…공정위, 중개사협회 조사 착수',
        link: 'https://news.naver.com/main/list.naver?mode=LPOD&mid=sec&sid1=001&sid2=140&oid=001&isYeonhapFlash=Y&aid=0013958961',
      },
    ],
  },
  leftNewsIndex: 0,
  rightNewsIndex: 0,
  TabOption: 'all',
  ViewerOption: 'grid',
};
