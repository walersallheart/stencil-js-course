import { Component } from "@stencil/core";
import { API_KEY } from '../../../config/config.js';

@Component({
    tag:'uc-stock-price',
    styleUrl:'./stock-price.css',
    shadow: true
})

export class StockPrice{
    render(){
        return [
            <form>
                <input id="stock-symbol" />
                <button type="submit">Fetch</button>
            </form>,
            <div>
                <p>Price: {0}</p>
            </div>
        ];
    }
}