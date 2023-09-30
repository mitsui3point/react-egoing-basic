import './App.css'
import {useState} from 'react' // useState 훅; react 기본 함수
/**
 * 컴포넌트(사용자 정의 태그)
 *  1.함수형
 *  2.반드시 첫글자 대문자
 * @returns component
 */
function Header(props) {
  return <header>
    <h1>
      <a
        href='/'
        onClick={(event) => {
          event.preventDefault()
          props.onChangeMode()
        }}>{props.title}</a> 
    </h1>
  </header>
}
function Nav(props) {
  const list = []
  for (let i = 0; i < props.topics.length; i++) {
    const t = props.topics[i]
    list.push(<li key={t.id}>
      <a
        id={t.id}
        href={'/read/'+t.id}
        onClick={(event) => {
          event.preventDefault()
          console.log(event.target.id, Number(event.target.id))

          props.onChangeMode(Number(event.target.id))
        }}>{t.title}</a>
      </li>) // Each child in a list should have a unique "key" prop.
  }
  return <nav>
    <ol>
      {list}
    </ol>
  </nav>
}
function Article(props) {
  return <article>
    <h2>{props.title}</h2>
    {props.body}
  </article>
}
function App() {
  // const _mode = useState('WELCOME')
  // const mode = _mode[0] // - 0: state 값 호출시 사용되는 variable
  // const setMode = mode[1] // - 1: state 값 변경시 사용되는 function
  const [mode, setMode] = useState('WELCOME')
  const [id, setId] = useState(null)
  const topics = [
    {'id': 1, 'title': 'html', 'body': 'html is...'},
    {'id': 2, 'title': 'css', 'body': 'css is...'},
    {'id': 3, 'title': 'js', 'body': 'js is...'},
  ]
  let content = null
  if (mode === 'WELCOME') {
    content = <Article title="Welcome" body="Hello, WEB"></Article>
  }
  console.log(id);
  if (mode === 'READ') {
    const {title, body} = topics[id - 1]
    content = <Article title={title} body={body}></Article>
  }
  return (
    <div className="App">
      <Header title="React" onChangeMode={() => {
        setMode('WELCOME')
      }}></Header>
      <Nav topics={topics} onChangeMode={(_id) => {
        setMode('READ')
        setId(_id)
      }}></Nav>
      {content}
    </div>
  )
}

export default App
