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

                :host(.important){
                    background:#ccc;
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