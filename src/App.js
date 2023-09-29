// import logo from './logo.svg';
import './App.css';
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
          event.preventDefault();
          props.onChangeMode();
        }}>{props.title}</a>
    </h1>
  </header>
}
function Nav(props) {
  const list = []
  for (let i = 0; i < props.topics.length; i++) {
    const t = props.topics[i];
    list.push(<li key={t.id}>
      <a
        id={t.id}
        href={'/read/'+t.id}
        onClick={(event) => {
          event.preventDefault();
          props.onChangeMode(event.target.id);
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
  const topics = [
    {'id': 1, 'title': 'html', 'body': 'html is...'},
    {'id': 2, 'title': 'css', 'body': 'css is...'},
    {'id': 3, 'title': 'js', 'body': 'js is...'},
  ]
  return (
    <div className="App">
      <Header title="React" onChangeMode={() => {
        alert('Header');
      }}></Header>
      <Nav topics={topics} onChangeMode={(id) => {
        alert(id)
      }}></Nav>
      <Article title="Welcome" body="Hello, WEB"></Article>
      <Article title="Hi" body="Hello, React"></Article>
    </div>
  );
}

export default App;
