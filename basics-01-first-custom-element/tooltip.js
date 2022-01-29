class Tooltip extends HTMLElement {
    constructor(){
        super();
        this._tooltipContainer;
        this.attachShadow({mode:'open'}); //use the shadow DOM instead of the light DOM

        this.shadowRoot.innerHTML = `
            <style>
                div{
                    background-color:black;
                    color:white;
                    position:absolute;
                    z-index:1000;
                }

                span{
                    position:relative;
                }

                ::slotted(.highlighted){
                    border-bottom:1px solid red;
                }
            </style>
            <slot></slot>
            <span> (?)</span>
        `;
    }

    //this is a built in function you need to use for DOM manupulation
    connectedCallback(){
        if (this.hasAttribute('text')) {
            this._tooltipText = this.getAttribute('text');
        }

        const tooltipIcon = this.shadowRoot.querySelector('span');
        tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
        tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));

        this.shadowRoot.appendChild(tooltipIcon);
    }

    _showTooltip(){
        this._tooltipContainer = document.createElement('div');
        this._tooltipContainer.textContent = this._tooltipText;
        this.shadowRoot.appendChild(this._tooltipContainer);
    }

    _hideTooltip(){
        this.shadowRoot.removeChild(this._tooltipContainer);
    }
}

customElements.define('uc-tooltip', Tooltip);