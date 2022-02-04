/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import '@stencil/core';




export namespace Components {

  interface UcSideDrawer {
    'open': () => void;
    'opened': boolean;
    'title': string;
  }
  interface UcSideDrawerAttributes extends StencilHTMLAttributes {
    'opened'?: boolean;
    'title'?: string;
  }

  interface UcStockPrice {
    'stockSymbol': string;
  }
  interface UcStockPriceAttributes extends StencilHTMLAttributes {
    'stockSymbol'?: string;
  }

  interface UcStockFinder {}
  interface UcStockFinderAttributes extends StencilHTMLAttributes {
    'onUcSymbolSelected'?: (event: CustomEvent<string>) => void;
  }
}

declare global {
  interface StencilElementInterfaces {
    'UcSideDrawer': Components.UcSideDrawer;
    'UcStockPrice': Components.UcStockPrice;
    'UcStockFinder': Components.UcStockFinder;
  }

  interface StencilIntrinsicElements {
    'uc-side-drawer': Components.UcSideDrawerAttributes;
    'uc-stock-price': Components.UcStockPriceAttributes;
    'uc-stock-finder': Components.UcStockFinderAttributes;
  }


  interface HTMLUcSideDrawerElement extends Components.UcSideDrawer, HTMLStencilElement {}
  var HTMLUcSideDrawerElement: {
    prototype: HTMLUcSideDrawerElement;
    new (): HTMLUcSideDrawerElement;
  };

  interface HTMLUcStockPriceElement extends Components.UcStockPrice, HTMLStencilElement {}
  var HTMLUcStockPriceElement: {
    prototype: HTMLUcStockPriceElement;
    new (): HTMLUcStockPriceElement;
  };

  interface HTMLUcStockFinderElement extends Components.UcStockFinder, HTMLStencilElement {}
  var HTMLUcStockFinderElement: {
    prototype: HTMLUcStockFinderElement;
    new (): HTMLUcStockFinderElement;
  };

  interface HTMLElementTagNameMap {
    'uc-side-drawer': HTMLUcSideDrawerElement
    'uc-stock-price': HTMLUcStockPriceElement
    'uc-stock-finder': HTMLUcStockFinderElement
  }

  interface ElementTagNameMap {
    'uc-side-drawer': HTMLUcSideDrawerElement;
    'uc-stock-price': HTMLUcStockPriceElement;
    'uc-stock-finder': HTMLUcStockFinderElement;
  }


  export namespace JSX {
    export interface Element {}
    export interface IntrinsicElements extends StencilIntrinsicElements {
      [tagName: string]: any;
    }
  }
  export interface HTMLAttributes extends StencilHTMLAttributes {}

}
