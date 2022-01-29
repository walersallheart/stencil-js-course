class Tooltip extends HTMLElement {
    constructor(){
        super();
        this._tooltipContainer;
        this.attachShadow({mode:'open'}); //use the shadow DOM instead of the light DOM
        const template = document.querySelector('#tooltip-template');
        this.shadowRoot.appendChild(template.content.cloneNode(true));
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
        this.style.position = 'relative';
        this.style.zIndex = 100;
    }

    _showTooltip(){
        this._tooltipContainer = document.createElement('div');
        this._tooltipContainer.textContent = this._tooltipText;
        this._tooltipContainer.style.backgroundColor = 'black';
        this._tooltipContainer.style.color = 'white';
        this._tooltipContainer.style.position = 'absolute';
        this.shadowRoot.appendChild(this._tooltipContainer);
    }

    _hideTooltip(){
        this.shadowRoot.removeChild(this._tooltipContainer);
    }
}

customElements.define('uc-tooltip', Tooltip);