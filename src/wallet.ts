import axios from "axios";
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
            const response = await axios.get(`${exchangeRateApiUrl}?symbols=${searchCurrencies}`)
            const exchangeRatesRatios = response.data.rates
            for(let stock of wallet.stocks){
                total += stock.count / (stock.currency === returnValueCurrency ? 1 : exchangeRatesRatios[stock.currency])
            }
            return parseFloat(total.toFixed(2))
        } catch (error) {
            if(error.response.data.error)
                throw new Error(error.response.data.error);
            else    
                throw error
        }    
    }
}