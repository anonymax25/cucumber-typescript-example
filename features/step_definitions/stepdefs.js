const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');

const computeWalletValue = require('../../build/index').computeWalletValue

Given('the following stocks are in the wallet', function ( wallet) {
    this.wallet = {stocks: []}
    for(let row of wallet.rawTable) {
        this.wallet.stocks.push({currency: row[0], count: row[1]})
    }
});

Given('no stocks are in the wallet', function () {
    this.wallet = {stocks: []}
});

When('I ask to compute it\'s value in {string} from the rates of {string}', async function (currency, date) {
    this.actualAnswer = await computeWalletValue(this.wallet, currency, date)
});

When('I ask to compute it\'s value in {string} from the rates of {string} and then from the rates of {string}', async function (currency, date1, date2) {
    this.answers = []
    this.answers.push(await computeWalletValue(this.wallet, currency, date1))
    this.answers.push(await computeWalletValue(this.wallet, currency, date2))
});

Then('the wallet value in the given currency should be {string}', function (expectedAnswer) {
    assert.equal(this.actualAnswer, parseFloat(expectedAnswer));
});

Then('the two values calculated should be different', function () {
    assert.notEqual(this.answers[0],this.answers[1])
});

Then('the two values calculated should be identical', function () {
    assert.equal(this.answers[0],this.answers[1])
});
