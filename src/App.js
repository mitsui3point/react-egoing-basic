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
function AButton(props) {
  const { url, text, onClick } = props
  return (
    <li>
      <a
        href={url}
        onClick={event => {
          event.preventDefault()
          onClick()
        }}
      >
        {text}
      </a>
    </li>
  )
}
function Button(props) {
  const { text, data, onClick } = props
  return (
    <li>
      <input
        type='button'
        value={text}
        onClick={event => {
          onClick(data)
        }}
      />
    </li>
  )
}
function Create(props) {
  const { onCreate } = props
  return (
    <article>
      <h2>Create</h2>
      <form
        onSubmit={event => {
          event.preventDefault()
          const { title, body } = event.target
          onCreate(title.value, body.value)
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
function Update(props) {
  const { topic, onUpdate } = props
  const [title, setTitle] = useState(topic.title)
  const [body, setBody] = useState(topic.body)
  return (
    <article>
      <h2>Update</h2>
      <form
        onSubmit={event => {
          event.preventDefault()
          const { title, body } = event.target
          onUpdate(title.value, body.value)
        }}
      >
        <p>
          <input
            name='title'
            placeholder='title'
            value={title}
            onChange={event => setTitle(event.target.value)}
          />
        </p>
        <p>
          <textarea
            name='body'
            placeholder='body'
            value={body}
            onChange={event => setBody(event.target.value)}
          />
        </p>
        <p>
          <input type='submit' value='Update' />
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
  let createButton = null
  let updateButton = null
  let deleteButton = null
  const buttons = {
    create: (
      <AButton text='Create' url='/create' onClick={() => setMode('CREATE')} />
    ),
    update: (
      <AButton
        text='Update'
        url={`/update/{id}`}
        onClick={() => setMode('UPDATE')}
      />
    ),
    delete: (
      <Button
        text='Delete'
        data={id}
        onClick={data => {
          const index = topics.findIndex(o => o.id === data)
          topics.splice(index, 1)
          const newTopics = [...topics]
          setTopics([...newTopics])

          setMode('WELCOME')
        }}
      />
    )
  }
  if (mode === 'WELCOME') {
    content = <Article title='Welcome' body='Hello, WEB' />
  }
  if (mode === 'READ') {
    const { title, body } = topics.find(o => o.id === id)
    content = <Article title={title} body={body} />
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
      />
    )
  }
  if (mode === 'UPDATE') {
    content = (
      <Update
        topic={topics.find(o => o.id === id)}
        onUpdate={(title, body) => {
          const index = topics.findIndex(o => o.id === id)
          const updatedTopic = { id: id, title: title, body: body }
          topics[index] = updatedTopic
          const newTopics = [...topics]
          setTopics(newTopics)

          setMode('READ')
        }}
      />
    )
    createButton = null
  }
  const isRequiredCreateButton = mode !== 'UPDATE' && mode !== 'CREATE'
  const isRequiredUpdateButton = mode === 'READ'
  if (isRequiredCreateButton) {
    createButton = buttons.create
  }
  if (isRequiredUpdateButton) {
    updateButton = buttons.update
    deleteButton = buttons.delete
  }
  console.log('count', count++)
  return (
    <div className='App'>
      <Header
        title='React'
        onChangeMode={() => {
          setMode('WELCOME')
        }}
      />
      <Nav
        topics={topics}
        onChangeMode={_id => {
          setMode('READ')
          setId(_id)
        }}
      />
      {content}
      <ul>
        {createButton}
        {updateButton}
        {deleteButton}
      </ul>
    </div>
  )
}

export default App
