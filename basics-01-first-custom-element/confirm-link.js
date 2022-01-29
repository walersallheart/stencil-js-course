class ConfirmLink extends HTMLAnchorElement{
    connectedCallback(){
        this.addEventListener('click', event => {
            if (!confirm('Do you really want to leave?')) {
                event.preventDefault();
                event.stopPropagation();
            }
        })
    }
}

customElements.define('uc-confirm-link', ConfirmLink, { extends:'a' });