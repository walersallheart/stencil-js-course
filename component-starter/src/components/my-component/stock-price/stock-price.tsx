import { Component, Element, Listen, Prop, State, Watch } from "@stencil/core";
import { API_KEY } from '../../../config/config';

@Component({
    tag:'uc-stock-price',
    styleUrl:'./stock-price.css',
    shadow: true
})

export class StockPrice{
    stockInput:HTMLInputElement;
    // initialStockSymbol:string;

    @Element() rootElement: HTMLElement;
    @State() fetchedPrice:number;
    @State() stockUserInput:string;
    @State() stockInputValid = false;
    @State() error:string;
    @State() loading = false;

    @Prop({mutable:true, reflectToAttr:true}) stockSymbol:string;

    @Watch('stockSymbol')
    stockSymbolChanged(newValue:string, oldValue:string){
        if (newValue !== oldValue)  {
            this.stockUserInput = newValue;
            this.stockInputValid = true;
            this.fetchStockPrice(newValue);
        }
    }

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
        this.stockSymbol = this.stockInput.value;
    }

    componentWillLoad(){
        console.log('componentWillLoad');
        console.log(this.stockSymbol);
    }

    componentDidLoad(){
        if (this.stockSymbol) {
            // this.initialStockSymbol = this.stockSymbol;
            this.stockUserInput = this.stockSymbol;
            this.stockInputValid = true;
            this.fetchStockPrice(this.stockSymbol);
        }
    }

    componentWillUpdate(){
        console.log('componentWillUpdate');
    }

    componentDidUpdate(){
        console.log('componentDidUpdate');
        // if (this.stockSymbol !== this.initialStockSymbol) {
        //     this.initialStockSymbol = this.stockSymbol;
        //     this.fetchStockPrice(this.stockSymbol);
        // }
    }

    componentWillUnload(){
        console.log('componentWillUnload');
    }

    componentDidUnload(){
        console.log('componentDidUnload');
    }

    @Listen('body:ucSymbolSelected')
    onStockSymbolSelected(event:CustomEvent){
        console.log('onStockSymbolSelected');
        if (event.detail && event.detail != this.stockSymbol){
            this.stockSymbol = event.detail;
        }
    }

    fetchStockPrice(stockSymbol:string){
        this.loading = true;

        fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${API_KEY}`)
            .then(response => {
                if (response.status !== 200) {
                    throw new Error('Invalid!');
                }
                return response.json()
            })
            .then(parsedResponse => {
                console.log(parsedResponse);
                if (!parsedResponse['Global Quote']['05. price']) {
                    throw new Error('Invalid Symbol');
                }

                this.error = null;

                this.fetchedPrice = +parsedResponse['Global Quote']['05. price'];
                this.loading = false;
            })
            .catch(err => {
                this.error = err.message;
                this.fetchedPrice = null;
                this.loading = false;
            });
    }

    hostData(){
        return {
            class: this.error ? 'error' : ''
        };
    }

    render(){
        let dataContent = <p>Please enter a symbol</p>;

        if (this.fetchedPrice){
            dataContent = <p>Price: ${this.fetchedPrice}</p>;
        }

        if (this.error)  {
            dataContent = <p>{this.error}</p>;
        }

        if (this.loading) {
            dataContent = <div class="lds-ring"><div></div><div></div><div></div><div></div></div>;
        }

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
                    disabled={!this.stockInputValid || this.loading}
                >Fetch</button>
            </form>,
            <div>
                {dataContent}
            </div>
        ];
    }
}