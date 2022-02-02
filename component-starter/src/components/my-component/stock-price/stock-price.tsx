import { Component } from "@stencil/core";
import { API_KEY } from '../../../config/config.js';

@Component({
    tag:'uc-stock-price',
    styleUrl:'./stock-price.css',
    shadow: true
})

export class StockPrice{
    onFetchStockPrice(event:Event){
        event.preventDefault();
        console.log('submitted');
        console.log(API_KEY);
    }

    render(){
        return [
            <form onSubmit={this.onFetchStockPrice}>
                <input id="stock-symbol" />
                <button type="submit">Fetch</button>
            </form>,
            <div>
                <p>Price: {0}</p>
            </div>
        ];
    }
}