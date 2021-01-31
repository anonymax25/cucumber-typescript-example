const Wallet = require('../../build/index').Wallet;

const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');

Given('I have a wallet', function () {
    this.wallet = new Wallet()
});

Given('the following stocks are in the wallet', function (stocks) {
    for(let row of stocks.rawTable) {
        this.wallet.stocks.push({currency: row[0], count: row[1]})
    }
});

Given('no stocks are in the wallet', function () {
    this.wallet.stocks = []
});

When('I ask to compute it\'s value in {string} from the rates of {string}', async function (currency, date) {
    this.actualAnswer = await Wallet.computeValue(this.wallet, currency, date)
});

When('I ask to compute it\'s value in {string} from the rates of {string} and then from the rates of {string}', async function (currency, date1, date2) {
    this.answers = []
    this.answers.push(await Wallet.computeValue(this.wallet, currency, date1))
    this.answers.push(await Wallet.computeValue(this.wallet, currency, date2))
});

Then('the wallet value in the given currency should be {string}', function (expectedAnswer) {
    assert.strictEqual(this.actualAnswer, parseFloat(expectedAnswer));
});

Then('the two values calculated should be different', function () {
    assert.notStrictEqual(this.answers[0],this.answers[1])
});

Then('the two values calculated should be identical', function () {
    assert.strictEqual(this.answers[0],this.answers[1])
});
