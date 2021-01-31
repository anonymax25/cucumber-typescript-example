
import { binding, given, then, when} from 'cucumber-tsflow';
import { assert } from 'chai';
import { Wallet } from '../../src/wallet';
import { Currencies } from '../../src/enums/currencies.enum';

@binding()
export class WalletValueSteps {

    wallet: Wallet = new Wallet()
    answers: number[] = []
    
    @given('I have a wallet')
    public setNewWallet() {
        this.wallet = new Wallet()
    }
    
    @given('the following stocks are in the wallet')
    public setStocks(stocks: any) {
        for(let row of stocks.rawTable) {
            this.wallet.stocks.push({currency: row[0], count: row[1]})
        }
    }
    
    @given('no stocks are in the wallet')
    public setNoStocks() {
        this.wallet.stocks = []
    }
    
    @when('I ask to compute it\'s value in {string} from the rates of {string}')
    public async computeRatesOneDate(currency: Currencies, date: string) {
        this.answers.push(await Wallet.computeValue(this.wallet, currency, date))
    }
    
    @when('I ask to compute it\'s value in {string} from the rates of {string} and then from the rates of {string}')
    async computeRatesTwoDates(currency: Currencies, date1: string, date2: string) {
        this.answers = []
        this.answers.push(await Wallet.computeValue(this.wallet, currency, date1))
        this.answers.push(await Wallet.computeValue(this.wallet, currency, date2))
    }
    
    @then('the wallet value in the given currency should be {string}')
    public compareAnswer(expectedAnswer: string) {
        assert.strictEqual(this.answers.shift(), parseFloat(expectedAnswer));
        this.answers = []
    }
    
    @then('the two values calculated should be different')
    compareTwoDifferentAnswers() {
        assert.notStrictEqual(this.answers[0],this.answers[1])
        this.answers = []
    }
    
    @then('the two values calculated should be identical')
    public compareTwoSameAnswers() {
        assert.strictEqual(this.answers.shift(),this.answers.shift())
        this.answers = []
    }

}