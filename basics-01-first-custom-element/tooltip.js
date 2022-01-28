class Tooltip extends HTMLElement {
    constructor(){
        super();
        this._tooltipContainer;
    }

    //this is a built in function you need to use for DOM manupulation
    connectedCallback(){
        const tooltipIcon = document.createElement('span');
        tooltipIcon.textContent = ' (?)';
        tooltipIcon.addEventListener('mouseenter', this._showTooltip);
        tooltipIcon.addEventListener('mouseleave', this._hideTooltip);

        this.appendChild(tooltipIcon);
    }

    _showTooltip(){
        this._tooltipContainer = document.createElement('div');
        this._tooltipContainer.textContent = 'This is the tooltip text!';
        this.appendChild(this._tooltipContainer);
    }

    _hideTooltip(){
        this.removeChild(this._tooltipContainer);
    }
}

customElements.define('uc-tooltip', Tooltip);