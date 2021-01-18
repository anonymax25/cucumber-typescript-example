# Compute Wallet Value - BDD

## Install dependencies
```npm install```

## Build
```npm run build```

## Launch Cucumber tests (builds before test)
```npm test```

## Code
Prototype:
``` 
async function computeWalletValue(wallet: Wallet, returnValueCurrency: Currencies = Currencies.EUR, date: string = 'latest'): Promise<number>
```

Check-out testIndex.ts for an example of how to call the function

