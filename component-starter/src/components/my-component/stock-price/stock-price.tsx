import { Component, Element, State } from "@stencil/core";
import { API_KEY } from '../../../config/config';

@Component({
    tag:'uc-stock-price',
    styleUrl:'./stock-price.css',
    shadow: true
})

export class StockPrice{
    stockInput:HTMLInputElement;
    @Element() rootElement: HTMLElement;
    @State() fetchedPrice:number;
    @State() stockUserInput:string;
    @State() stockInputValid = false;

    onUserInput(event:Event){
        this.stockUserInput = (event.target as HTMLInputElement).value;

        if (this.stockUserInput.trim() !== "") {
            this.stockInputValid = true;
        } else {
            this.stockInputValid = false;
        }
    }

    onFetchStockPrice(event:Event){
        event.preventDefault();

        //const stockSymbol = (this.el.shadowRoot.querySelector('#stock-symbol') as HTMLInputElement).value;
        const stockSymbol = this.stockInput.value;

        fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${API_KEY}`)
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
                <input
                    id="stock-symbol"
                    ref={el => this.stockInput = el}
                    value={this.stockUserInput}
                    onInput={this.onUserInput.bind(this)}
                />
                <button
                    type="submit"
                    disabled={!this.stockInputValid}
                >Fetch</button>
            </form>,
            <div>
                <p>Price: ${this.fetchedPrice}</p>
            </div>
        ];
    }
}