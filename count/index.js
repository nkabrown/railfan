const log = require('choo-log');
const choo = require('choo');
const html = require('choo/html');

const app = choo();
app.use(log());

app.model({
  state: { word: '', count: 0, answers: [] },
  reducers: {
    add: (data, state) => ({ word: data, count: data.length }),
    save: (data, state) => {
      const newAnswers = state.answers.slice();
      console.log(newAnswers);
      newAnswers.push(data);
      console.log(newAnswers);
      return { word: '', count: 0, answers: newAnswers }
    }
  }
});

const view = (state, prev, send) => {
  return html`
    <div class="content">
      <form id="letters">
        <input type="text" name="letters" form="letters" autocomplete="off" oninput=${onInput}/>
        <button form="letters" onclick=${onSubmit}>Save</button>
        ${ state.count > 0 ? html`<div class="output"><p>${state.word}</p><p>${state.count} characters</p></div>` : null }
      </form>
      <div class="saved-list">
        ${state.answers.map((answer) => html`<li>${answer.word} — ${answer.count} characters</li>`)}
      </div>
    </div>`

  function onInput(e) {
    send('add', e.target.value);
    e.preventDefault();
  }

  function onSubmit(e) {
    const input = document.getElementsByTagName('input');
    send('save', { word: state.word, count: state.count });
    input[0].value = '';
    e.preventDefault();
  }
}

app.router((route) => [
  route('/', view)
]);

const tree = app.start();
document.body.appendChild(tree);
