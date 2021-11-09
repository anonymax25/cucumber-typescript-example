# Cucumber & Typescript Examample

![example workflow](https://github.com/anonymax25/cucumber-typescript-example/actions/workflows/<WORKFLOW_FILE>/badge.svg)

## Author
[Maxime d'Harboullé](https://github.com/anonymax25)

## Behavior Driven Developement
*Behavior Driven Developement school project to use cucumber for testing.*
 
The goal of this example is to write and test code compute the value of a wallet containing differnet currencies in a given currency
  
Choosen language: <img src="https://slackmojis.com/emojis/1383-typescript/download" align="center" alt="typescript" title="image Title" height="25"/>

## Steps
### 1- Install dependencies
```npm install```

### 2 - Scripts
```npm run build``` builds the ts into js to ./build

```npm run test:unit``` launches unit tests

```npm run test:cucumber``` launches cucumber tests on the features in ```./features/...```

## Prototype:
```ts
async function computeWalletValue(wallet: Wallet, returnValueCurrency: Currencies = Currencies.EUR, date: string = 'latest'): Promise<number>
```
**Possible currencies:** CAD HKD ISK PHP DKK HUF CZK AUD RON SEK IDR INR BRL RUB HRK JPY THB CHF SGD PLN BGN TRY CNY NOK NZD ZAR USD MXN ILS GBP KRW MYR

Check-out our unit test: ```./test/test.js```, for an  example of how to call the function or run it by using ```npm run test:unit```

