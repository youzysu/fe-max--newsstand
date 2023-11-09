# 네이버 뉴스스탠드 프로젝트 📰

## 프로젝트 소개

- 기간: 2023.05.22. ~ 2023.06.18.
- 개인 프로젝트
- DEMO

  https://github.com/youzysu/fe-max--newsstand/assets/111998760/999c1dfd-be00-43b1-a309-788e70016fa3

### 📌 사용 기술

- 프론트엔드 개발: TypeScript, module.css
- 빌드 도구: Vite
- 백엔드: express
- 데이터 크롤링: puppeteer
- 테스트 도구: vitest
- Dependencies & version

  ```
  "devDependencies": {
    "@types/cors": "^2.8.13",
    "@types/express": "^4.17.17",
    "@typescript-eslint/eslint-plugin": "^5.59.6",
    "@typescript-eslint/parser": "^5.59.6",
    "eslint": "^8.41.0",
    "eslint-config-prettier": "^8.8.0",
    "eslint-import-resolver-typescript": "^3.5.5",
    "eslint-plugin-import": "^2.27.5",
    "eslint-plugin-prettier": "^4.2.1",
    "happy-dom": "^9.20.3",
    "nodemon": "^2.0.22",
    "prettier": "^2.8.8",
    "puppeteer": "^20.3.0",
    "ts-node": "^10.9.1",
    "typescript": "^5.0.2",
    "vite": "^4.3.2",
    "vitest": "^0.32.0"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.18.2"
  }
  ```

### 📌 디렉터리 구조

```
📦 fe-max--newsstand
├─ .eslintrc.json
├─ .github
├─ .gitignore
├─ .prettierrc
├─ __test__
│  ├─ NewsStandReducer.test.ts
│  └─ TabViewer.test.ts
├─ index.html
├─ package-lock.json
├─ package.json
├─ public
├─ readme.md
├─ server
│  ├─ data
│  │  ├─ crawler.mjs
│  │  ├─ listViewData.json
│  │  ├─ newsMedia.json
│  │  └─ trendNews.json
│  └─ index.ts
├─ src
│  ├─ api
│  │  └─ index.ts
│  ├─ components
│  │  ├─ Header
│  │  │  ├─ Header.ts
│  │  │  ├─ header.module.css
│  │  │  └─ index.ts
│  │  ├─ MediaViewer
│  │  │  ├─ GridViewer
│  │  │  │  ├─ Grid.ts
│  │  │  │  ├─ GridViewer.module.css
│  │  │  │  ├─ GridViewer.ts
│  │  │  │  └─ index.ts
│  │  │  ├─ ListViewer
│  │  │  │  ├─ FieldTab
│  │  │  │  │  ├─ CategoryTab.ts
│  │  │  │  │  ├─ FieldTab.module.css
│  │  │  │  │  ├─ FieldTab.ts
│  │  │  │  │  └─ index.ts
│  │  │  │  ├─ ListViewer.module.css
│  │  │  │  ├─ ListViewer.ts
│  │  │  │  ├─ PressArticle
│  │  │  │  │  ├─ MainArticle.ts
│  │  │  │  │  ├─ PressArticle.module.css
│  │  │  │  │  ├─ PressArticle.ts
│  │  │  │  │  ├─ PressInfo.ts
│  │  │  │  │  ├─ SubArticle.ts
│  │  │  │  │  └─ index.ts
│  │  │  │  └─ index.ts
│  │  │  ├─ MediaViewer.module.css
│  │  │  ├─ MediaViewer.ts
│  │  │  ├─ Modal
│  │  │  │  ├─ Modal.module.css
│  │  │  │  └─ SubscribeCancelModal.ts
│  │  │  ├─ SubscribeButton
│  │  │  │  ├─ SubscribeButton.module.css
│  │  │  │  └─ SubscribeButton.ts
│  │  │  ├─ ViewerButton
│  │  │  │  ├─ ViewerButton.module.css
│  │  │  │  └─ ViewerButton.ts
│  │  │  └─ index.ts
│  │  ├─ NewsBar
│  │  │  ├─ AutoRollingNews.ts
│  │  │  ├─ Headline.ts
│  │  │  ├─ NewsBar.module.css
│  │  │  ├─ NewsBar.ts
│  │  │  └─ index.ts
│  │  ├─ NewsStand.ts
│  │  ├─ TabViewer
│  │  │  ├─ Tab.ts
│  │  │  ├─ TabViewer.module.css
│  │  │  ├─ TabViewer.ts
│  │  │  ├─ Viewer.ts
│  │  │  └─ index.ts
│  │  └─ newsStand.module.css
│  ├─ constant
│  │  └─ index.ts
│  ├─ main.ts
│  ├─ service
│  │  ├─ handleSubscribeButtonClick.ts
│  │  └─ index.ts
│  ├─ store
│  │  ├─ index.ts
│  │  ├─ newsStandReducer.ts
│  │  └─ utils.ts
│  ├─ styles
│  │  ├─ common.css
│  │  ├─ reset.css
│  │  ├─ style.css
│  │  └─ theme.css
│  ├─ types
│  │  ├─ Action.ts
│  │  └─ index.ts
│  ├─ utils
│  │  └─ index.ts
│  └─ vite-env.d.ts
├─ tsconfig.json
├─ vite.config.js
└─ yarn.lock
```

## 설계

### 📌 Flux Pattern

> 참고: [#1 Flux 패턴 & 프로젝트 설계](https://github.com/youzysu/fe-max--newsstand/issues/1)

- State(Model, Data)와 Component(View, UI)를 분리한다.
- Component는 State를 인자로 전달받아 UI를 만든다.
- Component에서 발생한 Action을 dispatch를 통해 State를 변경한다.
- dispatch 함수를 통해 action과 payload를 전달하여 reducer로 상태를 변경한다.
- 해당 상태를 subscribe하는 함수에 변경된 상태를 인자로 전달하여 실행한다.
- 변경된 새로운 props를 전달받은 컴포넌트는 현재 상태와 비교하여 변경된 부분만 반영한다.

## 구현 기능

### 📌 [#2 기본 상단 영역 UI](https://github.com/youzysu/fe-max--newsstand/issues/2)

- 기본 상단 영역의 왼쪽에는 뉴스스탠드 로고를, 오른쪽에는 시스템 날짜를 표시한다.
- [뉴스 스탠드 로고를 클릭하면 화면을 새로고침 한다.](https://github.com/youzysu/fe-max--newsstand/issues/20)

### 📌 데이터 크롤링

- [#7 네이버 최신 뉴스 데이터 크롤링](https://github.com/youzysu/fe-max--newsstand/issues/7)
- [#8 네이버 언론사 브랜드 마크 이미지 데이터 크롤링](https://github.com/youzysu/fe-max--newsstand/issues/8)

### 📌 최신 뉴스 자동 롤링 영역

- [#6 NewsBar Component UI](https://github.com/youzysu/fe-max--newsstand/issues/6)
  - 왼쪽 바와 오른쪽 바는 각각 다른 최신 뉴스와 헤드라인 5개로 이루어진다.
- [#9 NewsBar Feature](https://github.com/youzysu/fe-max--newsstand/issues/9)
  - 각 뉴스바는 5초마다 자동으로 무한 롤링된다.
  - 이때, 좌우 영역은 1초 간격으로 번갈아가며 롤링된다. (두 영역의 뉴스는 동시에 롤링되지 않는다.)
  - 롤링될 때 바 영역 안에서 제목이 위로 넘어가는 애니메이션을 적용한다.
  - 각 영역에 마우스를 호버하면 무한 롤링이 일시정지되고, 헤드라인에 밑줄을 표시한다.

### 📌 언론사별 기사 확인 영역

- [#10 TabViewer 기본 UI 생성하고, TabOption와 Viewer Option 상태에 따라 활성화한다.](https://github.com/youzysu/fe-max--newsstand/issues/10)
  - 탭 구성: [전체 언론사], [내가 구독한 언론사]
  - 보기 옵션: [그리드 보기], [리스트 보기]
  - 기본 보기: [전체 언론사]

### 📌 전체 언론사: 그리드 보기

- [#5 width 930px height 388px의 영역에 6 \* 4 테이블로 구성된다.](https://github.com/youzysu/fe-max--newsstand/issues/5)
- [언론사 브랜드 마크의 순서는 페이지가 새로고침 될 때마다 랜덤으로 배치된다.](https://github.com/youzysu/fe-max--newsstand/blob/caa03a8968545e77818543740701c429474fd2f6/src/store/newsStandReducer.ts#LL15C32-L15C32)
- [좌우에 화살표로 언론사 페이지를 넘길 수 있다.](https://github.com/youzysu/fe-max--newsstand/blob/caa03a8968545e77818543740701c429474fd2f6/src/components/MediaArea/GridViewer/GridButton.ts#L22)
- [가장 첫 페이지의 왼쪽 화살표와 끝 페이지 오른쪽 화살표는 표시되지 않는다.](https://github.com/youzysu/fe-max--newsstand/issues/13)

### 📌 언론사 구독/해지 기능

- [[구독하기] 버튼을 클릭하면 해당 언론사를 구독한다.](https://github.com/youzysu/fe-max--newsstand/blob/caa03a8968545e77818543740701c429474fd2f6/src/components/MediaArea/SubscribeButton/SubscribeButton.ts)
- [각 언론사 브랜드마크가 있는 셀에 마우스를 올리면, 구독 상태에 따라 버튼을 표시한다.](https://github.com/youzysu/fe-max--newsstand/blob/caa03a8968545e77818543740701c429474fd2f6/src/components/MediaArea/GridViewer/Grid.ts)

### 📌 [전체 언론사: 리스트 보기](https://github.com/youzysu/fe-max--newsstand/issues/27)

- 리스트 보기 상태일 때 이전 Viewer를 지운다.
- 분야별 카테고리에서 언론사의 기사를 확인할 수 있다.
- 언론사 카테고리는 종합/경제, 방송/통신, IT, 영자지, 스포츠/연예, 메거진/전문지, 지역으로 구성된다.
- navbar tab은 기사 영역 상단에 가로로 긴탭 형태로 배치한다.
- navbar에서 선택된 카테고리 이름 옆에는 해당 카테고리에 속해있는 언론사의 개수와 현재 언론사의 순서를 표시한다.
- 언론사의 순서는 화면이 새로고침 될 때마다 랜덤으로 정해진다.
- 현재 순서의 언론사 내용이 표시된다.
- 좌우 화살표를 클릭하면 이전과 다음 언론사로 이동한다.
- 카테고리의 마지막 언론사가 보여진 후에는 다음 카테고리로 넘어가고, 카테고리의 첫 언론사인 경우에는 이전 카테고리로 넘어간다.
- 마지막 카테고리의 마지막 언론사가 보여진 후에는 처음 카테고리의 첫 언론사로 돌아온다.
- 한 언론사 당 20초 동안 화면에 보여지고, 20초가 지나면 다음 언론사의 내용이 나타난다.
- navbar 현재 카테고리 탭 배경에 프로그레스바 애니메이션을 적용하여 1초 단위로 색이 차오른다. (20초)
- 선택된 카테고리가 아닌 다른 카테고리에 마우스 호버 시 밑줄이 생긴다.
  카테고리를 클릭하면 해당 카테고리로 바로 이동한다.
- 메인 뉴스에 마우스를 호버하면 썸네일 이미지는 5% 확대되고 뉴스 타이틀에 밑줄이 생긴다.
- 서브 뉴스 타이틀에 마우스를 호버하면 밑줄이 생긴다.
- [구독하기] 버튼을 클릭하면 스낵바가 5초 간 보여진 후 내가 구독한 언론사 - 리스트 보기로 이동한다.

### 📌 구독한 언론사: 리스트 보기

- 내가 구독한 언론사는 리스트 보기를 기본으로 한다.
- 전체 언론사 리스트 보기 UI와 동일 (컴포넌트 재사용)
- navbar tab 구독하는 언론사 목록으로 하고, 선택한 언론사 이름 > 을 파란색으로 표시한다.
- 유저가 구독한 순서대로 배치한다.
- [구독해지] 버튼을 누르면 구독 해지 안내 모달창이 뜬다.
- 모달의 버튼에 마우스 호버 시 텍스트에 밑줄이 생긴다.
- 유저가 구독을 해지하면 즉시 유저의 구독 리스트에서 해당 언론사를 삭제하고 다음 순서의 언론사가 바로 나타난다.

### 📌 구독한 언론사: 그리드 보기

- 전체 언론사 그리드 보기 UI와 동일 (컴포넌트 재사용)
- 유저가 구독한 언론사 브랜드 마크만 보인다.
- 구독중인 언론사의 브랜드마크 셀에 마우스를 올리면 [구독해지] 버튼이 나타난다.
- 구독 해지 버튼을 누르면 구독 해지 안내 모달창이 뜬다. (위 컴포넌트 재사용)
- 유저가 구독을 해지하면 즉시 그리드에서 해당 언론사의 브랜드 마크가 삭제된다.

## 구현 과정 고민

### 🔎 Flux 패턴은 왜 등장했을까? 왜 Store와 View를 분리해야 할까?

- 데이터 단방향 흐름으로 상태 변화를 예측하기 쉽도록 한다.
- 하나의 상태 변경에 대해 여러 컴포넌트가 영향을 받는 경우

### Store와 View의 분리

- Store와 View를 분리했을 때, 상태 변화에 View가 어떻게 반응하도록 해야 할까? View가 상태를 구독하도록 만든다.
- 최상단 뉴스스탠드 컴포넌트에서 초기 상태를 받아 저장해두고, 특정 상태에 관심 있는(특정 상태가 변경되었을 때 다시 렌더링해야 하는) 컴포넌트만 다시 render를 실행한다.

### 초기 상태에서 데이터 fetch 로직을 어떻게 분리할까?

> [자세히보기](https://github.com/youzysu/fe-max--newsstand/issues/21)

- 컴포넌트 생성 시 비어있는 상태로 Element를 먼저 만들고 DOM을 생성한다.
- 데이터 fetch 작업을 DOM 생성 이후로 미루기 위해 함수 형태로 감싸는 thunk 함수를 만든다.
- 컴포넌트 클래스의 `componentDidMount` 메서드를 만들고, DOM 생성 이후 초기화에 필요한 로직을 진행한다.

```ts
const thunk = (next: Dispatch) => (action: Action | ThunkAction) => {
  if (typeof action === 'function') {
    return action(dispatch);
  }
  return next(action);
};

const thunkDispatch = thunk(dispatch);
```

### 뷰어 이동 버튼 Click Event Handling: 그리드 보기와 리스트 보기의 버튼이 상태에 따라 어떻게 다른 액션을 하도록 할까?

- Click 이벤트 핸들러가 TabOption(모든 언론사, 구독한 언론사), ViewerOption(그리드 보기, 리스트 보기) 상태에 따라 정해지도록 한다.

### 구독하기 버튼 Click Event Handling: 상태에 따라 동작이 복잡하다면 차라리 이것만을 위한 모듈을 만드는게 낫지 않을까?

- 구독한 언론사 탭에서는 구독하기 버튼을 클릭하면 구독 해지 모달창을 띄우고, 모든 언론사 탭에서는 바로 언론사 구독 상태를 변경해준다.
- 모든 언론사 탭의 리스트 보기에서는 스낵바가 보여지고 5초 후에 구독한 언론사 탭의 방금 추가한 언론사로 이동해야 한다.
- 통일성을 위해 컴포넌트 클래스에서 상태에 따라 모든 동작의 로직을 담으려고 시도하다 보니 구현도 까다롭고 코드도 복잡해졌다.
- 이렇게 하나의 동작에 대해 상태에 따라 핸들링해주는 모든 로직을 하나의 모듈에서 다루는게 구현하기도, 이해하기도 편할 거라는 생각이 들어 service 관련 모듈을 만들었다.
- 앞서 뷰어 이동 버튼도 마찬가지로 이렇게 하는게 더 나았을까? 하는 생각과 함꼐 해결 방법엔 정답이 없으니, 다양한 방법을 떠올려보고 각 방법의 장단점에 대해 생각해보고 결정하는 데에 시간을 들이자는 다짐을 했다.

## 학습 내용

### 🔎 CORS

- [구글 슬라이드 자료](https://docs.google.com/presentation/d/1nW8UdBO8p7t0Bkv9hbTCcy5GYc8gfkv2n4EHp15uji8/edit)

### 한줄 회고

- 상태가 하나만 변경되어도 여러 View에 반영이 되어야 해서 상태 관리의 어려움을 처음으로 느껴보았다!
- 직접 DOM API를 사용해서 변경된 부분만 렌더링 되도록 직접 로직을 구현하려면 직접 이전 상태와 비교하는 과정이 필요하다. (컴포넌트 각각 직접 비교해주거나 추상화한 함수를 통해 모든 컴포넌트에서 이를 활용하도록 해야 하는데 귀찮거나 챌린징했다.)
  - 현재 구독 상태 하나만 변경이 되었을 때도 [구독하기] 버튼이 [해지하기] 버튼으로 변경되기 위해서 컴포넌트 전체를 다시 생성한다.
- 이런 문제를 해결한 프론트엔드 라이브러리나 프레임워크를 만드는 개발자들에게 존경심을 느꼈다. 나도 더 성장해서 문제 해결에 기여하고 싶다!

## Getting Started

1. Clone

```
git clone https://github.com/youzysu/fe-max--newsstand.git
```

2. Install

```
yarn install
```

3. Run

```
yarn dev
```
