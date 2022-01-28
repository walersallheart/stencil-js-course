class Tooltip extends HTMLElement {
    constructor(){
        super();
        console.log('This is working!');
    }
}

customElements.define('uc-tooltip', Tooltip);