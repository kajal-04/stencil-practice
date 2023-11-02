class ConfirmLink extends HTMLAnchorElement {
    connectedCallback() {
        this.addEventListener('click', event => {
            if(!confirm('Do you want to navigate?')) {
                event.preventDefault();
            }
        })
    }
}

customElements.define('ka-confirm-link', ConfirmLink, {extends: 'a'});
