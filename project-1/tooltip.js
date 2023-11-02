class Tooltip extends HTMLElement {
  constructor() {
    super();
    // const tooltipIcon = document.createElement('span'); // Element created but not yet added to DOM
    // tooltipIcon.textContent = ' (?)'
    // this.appendChild(tooltipIcon);
    this._tooltipContainer;
    this._tooltipIcon;
    this._tooltipVisible = false;
    this._tooltipText = "Dummy tooltip text";
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        div {
          background-color: black;
          color: white;
          position: absolute;
          z-index: 10;
        }
      </style>
      <slot>Some Default</slot>
      <span> (?)</span>
    `;
  }
  
  connectedCallback() {
    if (this.hasAttribute('tooltip-text')) {
      this._tooltipText = this.getAttribute('tooltip-text');
    }
    // const tooltipIcon = document.createElement('span');
    // tooltipIcon.textContent = ' (?)';
    this._tooltipIcon = this.shadowRoot.querySelector('span');
    this._tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
    this._tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));
    this.style.position="relative";
  }

  disconnectedCallback() {
    this._tooltipIcon.removeEventListener('mouseenter', this._showTooltip);
    this._tooltipIcon.removeEventListener('mouseleave', this._hideTooltip);
  }

  _render() {
    let tooltipContainer = this.shadowRoot.querySelector('div');
    if (this._tooltipVisible) {
      this.tooltipContainer = document.createElement('div');
      this.tooltipContainer.textContent = this._tooltipText;
      this.shadowRoot.appendChild(this.tooltipContainer);
    } else {
      if (tooltipContainer) {
        this.shadowRoot.removeChild(this.tooltipContainer);
      }
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if(oldValue === newValue) {
      return;
    }
    if (name === 'tooltip-text'){
      this._tooltipText = newValue;
    }
  }

  static get observedAttributes() {
    return ['tooltip-text'];
  }

  _showTooltip() {
    this._tooltipVisible = true;
    this._render();
    // this._tooltipContainer = document.createElement('div');
    // this._tooltipContainer.textContent = this._tooltipText;
    // this.shadowRoot.appendChild(this._tooltipContainer);
  }

  _hideTooltip() {
    this._tooltipVisible = false;
    this._render();
    // this.shadowRoot.removeChild(this._tooltipContainer);
  }
}

customElements.define('ka-tooltip', Tooltip);