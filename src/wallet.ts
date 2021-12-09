import axios from "axios";
import { parse } from "url";
import { Currencies } from "./enums/currencies.enum";
import { Stock } from "./stock"
import * as dotenv from "dotenv";
dotenv.config();

export class Wallet {

    stocks: Stock[]


    constructor() {
        this.stocks = []
    }

    public static async computeValue(wallet: Wallet, returnValueCurrency: Currencies = Currencies.EUR, date: string = 'latest'): Promise<number> {
        const exchangeRateApiUrl = `http://api.exchangeratesapi.io/${date}`
        
        return new Promise((resolve, reject) => {
            let total: number = 0
            const searchCurrencies: string = wallet.stocks.filter(stock => stock.currency !== returnValueCurrency).map(stock => stock.currency).join(',')
            axios.get(`${exchangeRateApiUrl}?access_key=${process.env.API_KEY}&base=${returnValueCurrency}&symbols=${searchCurrencies}`).then(response => {
                if(!response.data.success){
                    reject(Error(response.data.error.info + "\n\tat:\n\t" + response.config.url))
                }
                const rawExchangeRatesRatios = response.data.rates
                const exchangeRatesRatios = new Map<string, number>(Object.entries(rawExchangeRatesRatios));
                for (let item of exchangeRatesRatios) {
                    exchangeRatesRatios.set(item[0], parseFloat(item[1].toFixed(2)));
                }
                for(let stock of wallet.stocks){
                    total += parseFloat((stock.count / (stock.currency === returnValueCurrency ? 1 : exchangeRatesRatios.get(stock.currency) || 0)).toFixed(2))
                }
                resolve(parseFloat(total.toFixed(2)))
            }).catch(err => {
                reject(err)
            })
        })
    
        
    }
}