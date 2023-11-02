class Modal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        #backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: rgba(0, 0, 0, 0.75);
          z-index: 10;
          opacity: 0;
          pointer-event: none;
        }

        #modal {
          position: fixed;
          top: 15vh;
          left: 25%;
          width: 50%;
          height: 30rem;
          z-index: 100;
          background: white;
          border-radius: 3px;
          box-shadow: 0 2px 88px rgba(0, 0, 0, 0.26);
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          opacity: 0;
          pointer-event: none;
        }

        header {
          padding: 1rem;
        }

        header h1 {
          font-size: 1.25rem;
        }

        main {
          padding: 1rem;
          flex-grow: 1;
        }

        #actions {
          border-top: 1px solid #ccc;
          padding: 1rem;
          display: flex;
          justify-content: flex-end;
        }

        #actions button {
          margin: 0 0.25rem;
        }
      </style>
      <div id="backdrop"></div>
      <div id="modal">
        <header>
          <h1>PLease Confirm</h1>
        </header>
        <section id="main">
          <slot></slot>
        </section>
        <section id="actions">
          <button>Cancel</button>
          <button>Okay</button>
        </section>
      </div>
    `;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if(name == 'opened') {
      if (this.hasAttribute('opened')) {
        this.shadowRoot.querySelector('#backrop').style.opacity = 1;
        this.shadowRoot.querySelector('#backrop').style.pointerEvents = 'all';
        this.shadowRoot.querySelector('#modal').style.opacity = 1;
        this.shadowRoot.querySelector('#modal').style.pointerEvents = 'all';
      }
    }

  }

  static get observedAttributes() {
    return ['opened'];
  }
}

customElements.define('ka-modal', Modal);