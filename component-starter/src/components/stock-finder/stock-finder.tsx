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
    @State() loading = false;

    @Event({bubbles:true, composed:true}) ucSymbolSelected:EventEmitter<string>;

    onFindStocks(event:Event){
        event.preventDefault();

        this.loading = true;

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

                this.loading = false;
            })
            .catch(err => {
                this.loading = false;
                console.log(err)
            });
    }

    onSelectSymbol(symbol:string){
        this.ucSymbolSelected.emit(symbol);
    }

    render(){
        let contentData = <ul>{
            this.searchResults.map(result => <li onClick={this.onSelectSymbol.bind(this, result.symbol)}><strong>{result.symbol}  - </strong>{result.name}</li>)
        }</ul>;

        if (this.loading) {
            contentData = <uc-spinner/>;
        }

        return [
            <form onSubmit={this.onFindStocks.bind(this)}>
                <input
                    id="stock-symbol"
                    ref={el => this.stockNameInput = el}
                />
                <button type="submit">Find</button>
            </form>,
            contentData
        ];
    }
}