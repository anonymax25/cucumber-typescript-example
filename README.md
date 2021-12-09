# Cucumber & Typescript Example

![cucumber tests](https://github.com/anonymax25/cucumber-typescript-example/actions/workflows/test_cucumber.yml/badge.svg) 

![unit tests](https://github.com/anonymax25/cucumber-typescript-example/actions/workflows/test_unit.yml/badge.svg)


## By [Maxime d'Harboullé](https://github.com/anonymax25)

## Goal
 
The goal of this example is to write and test code to compute the value of a wallet containing different currencies in a given currency in typescript. We will run mocha and cucumber/gherkin unit tests on this code.
  
Choosen language: <img src="https://slackmojis.com/emojis/1383-typescript/download" align="center" alt="typescript" title="image Title" height="26"/>  
Written and tested on nodejs: v12.22.6 aka. lts/erbium

## Steps
### 1 - Install dependencies
```npm install```

### 2 - Add the Api Key for echange rates
Go to <a href="https://exchangeratesapi.io/">https://exchangeratesapi.io/</a>, create an account and then copy the api key in a ```.env``` at the root of the project such as: 
```
API_KEY=74f1cf.....
```
### 3 - Scripts
```npm run build``` builds the ts into js to ./build

```npm run test:unit``` launches unit tests

```npm run test:cucumber``` launches cucumber tests on the features in ```./features/...```

## Prototype:
```ts
async function computeWalletValue(wallet: Wallet, returnValueCurrency: Currencies = Currencies.EUR, date: string = 'latest'): Promise<number>
```
**Possible currencies:** CAD HKD ISK PHP DKK HUF CZK AUD RON SEK IDR INR BRL RUB HRK JPY THB CHF SGD PLN BGN TRY CNY NOK NZD ZAR USD MXN ILS GBP KRW MYR

Check-out our unit test: ```./test/test.js```, for an  example of how to call the function or run it by using ```npm run test:unit```

