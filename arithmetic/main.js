const log = require('choo-log');
const choo = require('choo');
const html = require('choo/html');
const app = choo();
app.use(log());

app.model({
  state: { num1: '', num2: '' },
  reducers: {
    calculate: (data, state) => {
      return { num1: +data.right, num2: +data.left }
    }
  }
});

const view = (state, prev, send) => {
  return html`
  <div class="calculator">
    <form id="numbers" autocomplete="off" onsubmit=${(e) => {
      send('calculate', { right: e.target.children[1].value, left: e.target.children[3].value });
      e.target.children[1].value = '';
      e.target.children[3].value = '';
      e.preventDefault();
    }}>
      <label for="right-operand">Right operand</label>
      <input type="text" id="right-operand"/>
      <label for="left-operand">Left operand</label>
      <input type="text" id="left-operand"/>
      <button form="numbers" type="submit">Calculate</button>
    </form>
    <div class="calculations">
      ${typeof state.num1 === 'number' ? html`<p>${state.num1} + ${state.num2} = ${state.num1 + state.num2}</p>` : null}
      ${typeof state.num1 === 'number' ? html`<p>${state.num1} - ${state.num2} = ${state.num1 - state.num2}</p>` : null}
      ${typeof state.num1 === 'number' ? html`<p>${state.num1} * ${state.num2} = ${state.num1 * state.num2}</p>` : null}
      ${typeof state.num1 === 'number' ? html`<p>${state.num1} / ${state.num2} = ${state.num1 / state.num2}</p>` : null}
    </div>
  </div>`
}

app.router((route) => [
  route('/', view)
]);

const tree = app.start();
document.body.appendChild(tree);
