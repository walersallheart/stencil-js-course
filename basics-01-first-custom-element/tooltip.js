class Tooltip extends HTMLElement {
    constructor(){
        super();
        this._tooltipIcon;
        this._tooltipVisible = false;
        this.attachShadow({mode:'open'}); //use the shadow DOM instead of the light DOM

        this.shadowRoot.innerHTML = `
            <style>
                div{
                    background-color:black;
                    color:white;
                    position:absolute;
                    top:1.5rem;
                    left:0.75rem;
                    z-index:1000;
                    padding:0.25rem;
                    border-radius:3px;
                    box-shadow:1px 1px 6px rgba(0,0,0,0.26);
                    font-weight:normal;
                }

                :host(.important){
                    background:var(--color-primary, #ccc);
                    padding:.15rem;
                }

                :host-context(p) {
                    font-weight:bold;
                }

                span{
                    position:relative;
                }

                ::slotted(.highlighted){
                    border-bottom:1px solid red;
                }

                .icon{
                    background-color:black;
                    color:white;
                    padding:0.15rem .5rem;
                    text-align:center;
                    border-radius:50%;
                }
            </style>
            <slot></slot>
            <span class="icon">?</span>
        `;
    }

    //this is a built in function you need to use for DOM manupulation
    connectedCallback(){
        if (this.hasAttribute('text')) {
            this._tooltipText = this.getAttribute('text');
        }

        this._tooltipIcon = this.shadowRoot.querySelector('span');
        this._tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
        this._tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));
        this._render();
    }

    attributeChangedCallback(name, oldValue, newValue){
        if (oldValue === newValue) {
            return;
        }

        if (name === 'text') {
            this._tooltipText = newValue;
        }
    }

    static get observedAttributes(){
        return ['text'];
    }

    disconnectedCallback(){
        console.log('disconnected');
        this._tooltipIcon.removeEventListener('mouseenter', this._showTooltip);
        this._tooltipIcon.removeEventListener('mouseleave', this._hideTooltip);
    }

    _render(){
        let tooltipContainer = this.shadowRoot.querySelector('div');

        if (this._tooltipVisible){
            tooltipContainer = document.createElement('div');
            tooltipContainer.textContent = this._tooltipText;
            this.shadowRoot.appendChild(tooltipContainer);
        } else {
            if (tooltipContainer) {
                this.shadowRoot.removeChild(tooltipContainer);
            }
        }
    }

    _showTooltip(){
        this._tooltipVisible = true;
        this._render();
    }

    _hideTooltip(){
        this._tooltipVisible = false;
        this._render();
    }
}

customElements.define('uc-tooltip', Tooltip);