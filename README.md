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

Check-out testIndex.ts for an example of how to call the function or run it by using ```npm run start:test```

