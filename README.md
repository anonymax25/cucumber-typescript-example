# Compute Wallet Value - BDD
Maxime d'Harboullé 4AL1
## Install dependencies
```npm install```

## Build
```npm run build```

## Launch Cucumber tests (builds before test)
```npm test```

## Code
Prototype:
```ts
async function computeWalletValue(wallet: Wallet, returnValueCurrency: Currencies = Currencies.EUR, date: string = 'latest'): Promise<number>
```
// Possible currencies: CAD HKD ISK PHP DKK HUF CZK AUD RON SEK IDR INR BRL RUB HRK JPY THB CHF SGD PLN BGN TRY CNY NOK NZD ZAR USD MXN ILS GBP KRW MYR

Check-out testIndex.ts for an example of how to call the function or run it by using ```npm run start:test```

