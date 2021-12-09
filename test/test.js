
const Wallet = require('../build/index').Wallet
const Currencies = require('../build/index').Currencies
const Stock = require('../build/index').Stock

const assert =  require('chai').assert;

describe('Test build index', function() {
  it('should return the value of the US dollar and Roubbles wallet in Euros', async function() {
      const baseCurrency = Currencies.EUR
      const wallet = new Wallet()
      wallet.stocks.push(new Stock(Currencies.USD, 34))
      wallet.stocks.push(new Stock(Currencies.RUB, 3200))
      const result = await Wallet.computeValue(wallet, baseCurrency, '2021-01-17')
      assert.strictEqual(result, 64.13);
  });
});
