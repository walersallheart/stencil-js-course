import { Component, State } from "@stencil/core";
import { API_KEY } from '../../../config/config';

@Component({
    tag:'uc-stock-price',
    styleUrl:'./stock-price.css',
    shadow: true
})

export class StockPrice{
    @State() fetchedPrice:number;

    onFetchStockPrice(event:Event){
        event.preventDefault();

        fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=${API_KEY}`)
            .then(response => {
                return response.json()
            })
            .then(parsedResponse => {
                console.log(parsedResponse);
                this.fetchedPrice = +parsedResponse['Global Quote']['05. price'];
            })
            .catch(err => console.log(err));
    }

    render(){
        return [
            <form onSubmit={this.onFetchStockPrice.bind(this)}>
                <input id="stock-symbol" />
                <button type="submit">Fetch</button>
            </form>,
            <div>
                <p>Price: ${this.fetchedPrice}</p>
            </div>
        ];
    }
}