# React 

## 설치

### node 설치(없을 경우, 혹은 버전이 맞지않는 경우)
```bash
$ node -v
$ brew install node
```
### react 프로젝트 설치
```bash
$ npx create-react-app my-app
$ cd my-app
$ npm start
```

## build & run

### build
```bash
$ npm run build
```
### run from build file
```bash
$ npx serve -s build
```
### run
```bash
$ npm start
```

## 컴포넌트

- 컴포넌트를 만드는 기술인 리액트 덕분에 개발자는 하나의 독립된 부품으로 태그를 만들수 있게 되었다.
- 이 부품을 이용하게 되면 더 적은 복잡도로 소프트웨어를 만들 수 있게 된다.
- 이 부품을 이용하면 컴포넌트를 다른 사람에게 공유할 수도 있다.
- 다른 사람이 만든 컴포넌트를 내가 사용할 수도 있다.

## PROP

- 컴포넌트의 속성
```html
<!-- markup 의 속성 -->
<!-- src, width, height -->
<img src=“image.jpg” width=“100” height=“100”>
```
```html
<!-- 리액트 컴포넌트의 속성 -->
<!-- title -->
<Header title=“React”></Header>
```
```
- 생성된 태그 추적을 위한 ``<li>`` tag 의 key 생성
```javascript
// 리액트가 생성된 태그들을 추적해야 하는데, 추적할 key가 없을경우에 오류를 발생시킴
function Nav(props) {
  const list = []
  for (let i = 0; i < props.topics.length; i++) {
    const t = props.topics[i]
    list.push(
      <li key={t.id}>
        <a
          id={t.id}
          href={'/read/' + t.id}
          onClick={(event) => {
            event.preventDefault()
            props.onChangeMode(Number(event.target.id))
          }}
        >
          {t.title}
        </a>
      </li>
    ) // <li> key 넣는 이유; Each child in a list should have a unique "key" prop.
  }
```

## Event

```html
<!-- 여기 html 태그를 보면 onclick 이라는 property가 있다. 이 property 덕분에 사용자는 경고창을 띄울 수 있다. -->
<input type=“button” onclick=“alert(‘hi’)”>
```
```javascript
// 컴포넌트 선언부
function Header(props) {
  return <header>
    <h1><a href='/'>{props.title}</a></h1>
    <h1>
      <a
        href='/'
        onClick={(event) => {
          event.preventDefault();
          props.onChangeMode();
        }}>{props.title}</a>
    </h1>
  </header>
  // jsx 문법 onclick(X) => onClick(O) 
}
// 컴포넌트 호출부
<Header title="React" onChangeMode={() => {
  alert('Header');
}}></Header>
```
- Jsx
    - https://ko.legacy.reactjs.org/docs/introducing-jsx.html
- Jsx 속성 정의
    - https://ko.legacy.reactjs.org/docs/introducing-jsx.html#specifying-attributes-with-jsx

## State
- Component function
    - 입력 : prop, state
    - 출력 : return
- Prop vs State
    - Prop : component 외부 사용자를 위한 데이터
    - State : component 내부 사용자를 위한 데이터 
- useState hook 을 사용해야 한다
    - Import {useState} from ‘react’;
    - 리액트에서 제공하는 기본 함수
    - useState(‘WELCOME’)
        - 배열 리턴
        - 0: state 값 호출시 사용되는 variable
        - 1: state 값 변경시 사용되는 function

## Create / Read
- 글, 폼 생성
- const[value, setValue] = useState(PRIMITIVE)
    - PRIMITIVE; string, number, bigint, boolean, undefined, symbol, null
    - 기존방식 그대로 set
- const[value, setValue] = useState(Object)
    - Object, Array(복사해서 넣어줘야 함)
      - https://react.dev/learn/updating-objects-in-state
      - https://react.dev/learn/updating-arrays-in-state

## Update
- 글 폼 업데이트
- Update = Create + Read
- Prop(;component 외부 사용자를 위한 데이터)
    - Immutable 하므로 State(;component 내부 사용자를 위한 데이터) 로 치환해서 변경해 줘야 함
    - Input, textarea 각각 onChange event 에 setState

## Delete
- 글 폼 삭제
- 삭제 후 삭제된 상세에 접근할 수 없으므로 목록 페이지로 노출
