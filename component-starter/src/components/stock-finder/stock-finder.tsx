import { Component, Event, EventEmitter, State } from "@stencil/core";
import { API_KEY } from '../../config/config';

@Component({
    tag:'uc-stock-finder',
    styleUrl:'./stock-finder.css',
    shadow:true
})

export class StockFinder{
    stockNameInput:HTMLInputElement;

    @State() searchResults:{symbol:string, name:string}[] = [];

    @Event({bubbles:true, composed:true}) ucSymbolSelected:EventEmitter<string>;

    onFindStocks(event:Event){
        event.preventDefault();

        const stockName = this.stockNameInput.value;

        fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockName}&apikey=${API_KEY}`)
            .then(response => {
                return response.json()
            })
            .then(parsedResponse => {
                console.log(parsedResponse);
                this.searchResults = parsedResponse.bestMatches.map(match => {
                    return { name: match['2. name'], symbol: match['1. symbol'] };
                });
            })
            .catch(err => console.log(err));
    }

    onSelectSymbol(symbol:string){
        this.ucSymbolSelected.emit(symbol);
    }

    render(){
        return [
            <form onSubmit={this.onFindStocks.bind(this)}>
                <input
                    id="stock-symbol"
                    ref={el => this.stockNameInput = el}
                />
                <button type="submit">Find</button>
            </form>,
            <ul>
                {
                    this.searchResults.map(result => <li onClick={this.onSelectSymbol.bind(this, result.symbol)}><strong>{result.symbol}  - </strong>{result.name}</li>)
                }
            </ul>
        ];
    }
}