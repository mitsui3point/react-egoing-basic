import './App.css'
import { useState } from 'react' // useState 훅; react 기본 함수
let count = 0 // state change 할때 마다 몇번 App() 호출하는지 확인목적
/**
 * 컴포넌트(사용자 정의 태그)
 *  1.함수형
 *  2.반드시 첫글자 대문자
 * @returns component
 */
function Header(props) {
  return (
    <header>
      <h1>
        <a
          href='/'
          onClick={(event) => {
            event.preventDefault()
            props.onChangeMode()
          }}
        >
          {props.title}
        </a>
      </h1>
    </header>
  )
}
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
    ) // Each child in a list should have a unique "key" prop.
  }
  return (
    <nav>
      <ol>{list}</ol>
    </nav>
  )
}
function Article(props) {
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  )
}
function Create(props) {
  return (
    <article>
      <h2>Create</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault()
          let { title, body } = event.target
          props.onCreate(title.value, body.value)
        }}
      >
        <p>
          <input name='title' placeholder='title' />
        </p>
        <p>
          <textarea name='body' placeholder='body' />
        </p>
        <p>
          <input type='submit' value='Create' />
        </p>
      </form>
    </article>
  )
}
function App() {
  const [mode, setMode] = useState('WELCOME') // 페이지 구분
  const [id, setId] = useState(null)
  const [nextId, setNextId] = useState(4)
  const [topics, setTopics] = useState([
    { id: 1, title: 'html', body: 'html is...' },
    { id: 2, title: 'css', body: 'css is...' },
    { id: 3, title: 'js', body: 'js is...' }
  ])
  let content = null
  if (mode === 'WELCOME') {
    content = <Article title='Welcome' body='Hello, WEB'></Article>
  }
  if (mode === 'READ') {
    const { title, body } = topics[id - 1]
    content = <Article title={title} body={body}></Article>
  }
  /**
    - const[value, setValue] = useState(PRIMITIVE)
      - PRIMITIVE; string, number, bigint, boolean, undefined, symbol, null
      - 기존방식 그대로 setState
    - const[value, setValue] = useState(Object)
      - Object, Array; 새 객체를 만들어서 다시 setState 해 줘야 함.
      - https://react.dev/learn/updating-objects-in-state
      - https://react.dev/learn/updating-arrays-in-state
   */
  if (mode === 'CREATE') {
    content = (
      <Create
        onCreate={(title, body) => {
          const newTopic = { id: nextId, title: title, body: body }
          const newTopics = [...topics, newTopic]
          setTopics(newTopics) // setState 시에 같은 객체(참조주소가 같음)일 경우 re-rendering 하지 않는다. 새 객체로 갈음해줘야 re-rendering

          setMode('READ')
          setId(nextId)
          setNextId(nextId + 1)
        }}
      ></Create>
    )
  }
  console.log('count', count++)
  return (
    <div className='App'>
      <Header
        title='React'
        onChangeMode={() => {
          setMode('WELCOME')
        }}
      ></Header>
      <Nav
        topics={topics}
        onChangeMode={(_id) => {
          setMode('READ')
          setId(_id)
        }}
      ></Nav>
      {content}
      <a
        href='/create'
        onClick={(event) => {
          event.preventDefault()
          setMode('CREATE')
        }}
      >
        Create
      </a>
    </div>
  )
}

export default App
