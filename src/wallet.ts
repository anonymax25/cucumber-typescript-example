import axios from "axios";
import { parse } from "url";
import { Currencies } from "./enums/currencies.enum";
import { Stock } from "./stock"

export class Wallet {

    stocks: Stock[]

    constructor() {
        this.stocks = []
    }

    public static async computeValue(wallet: Wallet, returnValueCurrency: Currencies = Currencies.EUR, date: string = 'latest'): Promise<number> {
        const exchangeRateApiUrl = `https://api.exchangeratesapi.io/${date}`
    
        let total: number = 0
        const searchCurrencies: string = wallet.stocks.filter(stock => stock.currency !== returnValueCurrency).map(stock => stock.currency).join(',')
        try {
            const response = await axios.get(`${exchangeRateApiUrl}?base=${returnValueCurrency}&symbols=${searchCurrencies}`)
            const rawExchangeRatesRatios = response.data.rates
            const exchangeRatesRatios = new Map<string, number>(Object.entries(rawExchangeRatesRatios));
            for (let item of exchangeRatesRatios) {
                exchangeRatesRatios.set(item[0], parseFloat(item[1].toFixed(2)));
            }
            for(let stock of wallet.stocks){
                total += parseFloat((stock.count / (stock.currency === returnValueCurrency ? 1 : exchangeRatesRatios.get(stock.currency) || 0)).toFixed(2))
            }
            return parseFloat(total.toFixed(2))
        } catch (error) {
            if(error.response && error.response.data && error.response.data.error)
                throw new Error(error.response.data.error);
            else    
                throw error
        }    
    }
}