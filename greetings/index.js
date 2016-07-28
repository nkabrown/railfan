const chooLog = require('choo-log');
const choo = require('choo');
const html = require('choo/html');

const logger = chooLog();
const app = choo({
  onAction: logger.onAction,
  onError: logger.onError,
  onStateChange: logger.onStateChange
});

app.model({
  state: { name: '' },
  reducers: {
    hello: (data, state) =>  ({ name: data })
  }
});

const view = (state, prev, send) => {
 return  html`
  <main>
    <div class="hello-content">
      <h1>HI!</h1>
      <form id="name" autocomplete="off" onsubmit=${(e) => {
        send('hello', e.target.children[1].value);
        e.target.children[1].value = '';
        e.preventDefault();
      }}>
        <p>What’s your name?</p>
        <input type="text" placeholder="Name" id="name"> 
        ${state.name ? html`<p class="greetings">Well ${state.name}, nice to meet you!</p>` : null}
      </form>
    </div>
  </main>`

}

app.router((route) => [
  route('/', view)
]);

const tree = app.start();
document.body.appendChild(tree);
