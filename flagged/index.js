const log = require('choo-log');
const choo = require('choo');
const html = require('choo/html');
const app = choo();
app.use(log());

app.model({
  state: { list: [] },
  reducers: {
    add: (data, state) => {
      const newList = state.list.slice();
      newList.push(data);
      return { list: newList };
    },
    alphabetize: (data, state) => {
      const newList = state.list.slice();
      newList.sort();
      return { list: newList };
    }
  }
});

const listView = (state, prev, send) => {
  return html`<div class="list">
    <h1>Flagged Items</h1>
    <input type="text" autocomplete="off" name="list">
    <button onclick=${addItem}>Add</button>
    <ul>${state.list.map(item => html`<li>${item}</li>`)}</ul>
    <select onchange=${sort}>
      <option></option>
      <option>Alphabetical</option> 
    </select>
  </div>`

  function addItem(e) {
    const input = document.querySelector('input');
    send('add', input.value);
    input.value = '';
  }

  function sort(e) {
    console.log(e.target.value);
    if (e.target.value === 'Alphabetical') {
      send('alphabetize', state.list); 
    } 
  }
    
}

app.router((route) => [
  route('/', listView)
]);

const tree = app.start();
document.body.appendChild(tree);
