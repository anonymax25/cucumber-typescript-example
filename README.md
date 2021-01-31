# Compute Wallet Value - BDD
Maxime d'Harboullé 4AL1
*Behavior Driven Developement school project to use cucumber for testing*
## Install dependencies
```npm install```

## Scripts
```npm run build``` builds the ts into js to ./build

```npm run test:unit``` launches unit tests

```npm run test:cucumber``` launches cucumber tests on the features in ```./features/...```
## Prototype:
```ts
async function computeWalletValue(wallet: Wallet, returnValueCurrency: Currencies = Currencies.EUR, date: string = 'latest'): Promise<number>
```
**Possible currencies:** CAD HKD ISK PHP DKK HUF CZK AUD RON SEK IDR INR BRL RUB HRK JPY THB CHF SGD PLN BGN TRY CNY NOK NZD ZAR USD MXN ILS GBP KRW MYR

Check-out our unit test :```./test.test.js ``` for an  example of how to call the function or run it by using ```npm run test:unit```

