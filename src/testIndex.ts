import { Currencies } from "./enums/currencies.enum";
import { computeWalletValue } from "./index";
import { Stock } from "./models/stock";
import { Wallet } from "./models/wallet";

// Possible currencies: CAD HKD ISK PHP DKK HUF CZK AUD RON SEK IDR INR BRL RUB HRK JPY THB CHF SGD PLN BGN TRY CNY NOK NZD ZAR USD MXN ILS GBP KRW MYR

const baseCurrency = Currencies.EUR
const wallet = new Wallet()
wallet.stocks.push(new Stock(Currencies.USD, 34))
wallet.stocks.push(new Stock(Currencies.RUB, 3200))

computeWalletValue(wallet, baseCurrency, '2021-01-17').then( res => {
    console.log(`You have the equivilant of ${res} ${baseCurrency} in your wallet`);
}).catch( err => {
    console.error(err);
})

