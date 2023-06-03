# 네이버 뉴스스탠드 프로젝트 📰

## 프로젝트 소개

- 기간: 2023.05.22. ~
- 개인 프로젝트
- DEMO:

### 📌 사용 기술

- 프론트엔드 개발: TypeScript, module.css
- 빌드 도구: Vite
- 백엔드: express
- 데이터 크롤링: puppeteer
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
      "nodemon": "^2.0.22",
      "prettier": "^2.8.8",
      "puppeteer": "^20.3.0",
      "ts-node": "^10.9.1",
      "typescript": "^5.0.2",
      "vite": "^4.3.2"
    },
    "dependencies": {
      "cors": "^2.8.5",
      "express": "^4.18.2"
    }
  ```

### 📌 디렉터리 구조 (업데이트 예정)

```
📦
├─ .eslintrc.json
├─ .gitignore
├─ .prettierrc
├─ index.html
├─ package-lock.json
├─ package.json
├─ public
├─ readme.md
├─ server
│  ├─ data
│  │  ├─ crawler.mjs
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
│  │  ├─ MediaArea
│  │  │  ├─ GridViewer
│  │  │  │  ├─ Grid.ts
│  │  │  │  ├─ GridButton.ts
│  │  │  │  ├─ GridViewer.module.css
│  │  │  │  ├─ GridViewer.ts
│  │  │  │  └─ index.ts
│  │  │  ├─ MediaArea.module.css
│  │  │  ├─ MediaArea.ts
│  │  │  ├─ SubscribeButton
│  │  │  │  ├─ SubscribeButton.module.css
│  │  │  │  └─ SubscribeButton.ts
│  │  │  └─ index.ts
│  │  ├─ NewsBar
│  │  │  ├─ AutoRollingNews.ts
│  │  │  ├─ Headline.ts
│  │  │  ├─ NewsBar.module.css
│  │  │  ├─ NewsBar.ts
│  │  │  └─ index.ts
│  │  ├─ TabViewer
│  │  │  ├─ Tab.ts
│  │  │  ├─ TabViewer.module.css
│  │  │  ├─ TabViewer.ts
│  │  │  ├─ Viewer.ts
│  │  │  └─ index.ts
│  │  ├─ NewsStand.ts
│  │  └─ newsStand.module.css
│  ├─ constant
│  │  └─ index.ts
│  ├─ main.ts
│  ├─ store
│  │  ├─ index.ts
│  │  └─ newsStandReducer.ts
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

## 구현 과정 고민

### 🔎 Flux 패턴은 왜 등장했을까? 왜 Store와 View를 분리해야 할까?

- 데이터 단방향 흐름
- 하나의 상태 변경에 대해 여러 컴포넌트가 영향을 받는 경우

### Store를 어떻게 관리할까? 앞으로 Store를 어떤 기준으로 나눌까?

- 모든 상태를 전역으로 두고, 모든 컴포넌트가 모든 상태를 구독할 필요 없다.
- 상태 변화에 반응해야 하는 컴포넌트 단위로 Store를 구성한다.

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

## 학습 내용

### 🔎 CORS

- [구글 슬라이드 자료](https://docs.google.com/presentation/d/1nW8UdBO8p7t0Bkv9hbTCcy5GYc8gfkv2n4EHp15uji8/edit)

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
