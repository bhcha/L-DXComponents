/* playground-fold */
import {LitElement, html} from 'lit';

class MyElement extends LitElement {
    static properties = {
        greeting: {},
        todos: {type: Array},
        show: {type: Boolean},
    };

    constructor() {
        super();
        this.greeting = `222Hiya, let's get some stuff done...`;
        this.todos = ['sleep!', 'eat', 'work', 'exercise'];
        this.show = false;
    }
    /* playground-fold-end */

    render() {
        return html`
      <p>
        ${this.greeting}
        <button @click=${() => (this.show = !this.show)}>Todos</button>
      </p>
      ${
            this.show
                ? html`
          <ul>${this.todos.map((i) => html`<li>${i}</li>`)}</ul>
        `
                : ''
        }`;
    } /* playground-fold */
}
customElements.define('my-element', MyElement);
