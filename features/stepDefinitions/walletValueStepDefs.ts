
import { binding, given, then, when} from 'cucumber-tsflow';
import { assert } from 'chai';
import { Wallet } from '../../src/wallet';
import { Currencies } from '../../src/enums/currencies.enum';

@binding()
export class WalletValueSteps {

    wallet: Wallet = new Wallet()
    answers: number[] = []
    dates: string[] = []
    referenceRatesAtDate: Map<string,Map<string,Map<string,number>>> = new Map()
    referenceRateWalletValue: number = 0
    
    @given('I have a wallet')
    public setNewWallet() {
        this.wallet = new Wallet()
    }
    
    @given('the rates at the time of {string} are')
    public setRatesToMap(date: string, setRatesForDate: {rawTable: Array<Array<any>>}) {
        let referenceRates = new Map<string,Map<string,number>>()
        setRatesForDate.rawTable.forEach((rate: Array<string>) => {
            if(referenceRates.has(rate[0])){
                referenceRates.get(rate[0])?.set(rate[1], parseFloat(rate[2]))
            }else{
                referenceRates.set(rate[0], new Map())
                referenceRates.get(rate[0])?.set(rate[1], parseFloat(rate[2]))
            }
        });
        this.referenceRatesAtDate.set(date, referenceRates)
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
        this.dates = []
        this.dates.push(date)
        this.answers = []
        this.answers.push(await Wallet.computeValue(this.wallet, currency, date))
        this.referenceRateWalletValue = this.computeWalletValueLocal(currency, date)
    }
    
    @when('I ask to compute it\'s value in {string} from the rates of {string} and then from the rates of {string}')
    async computeRatesTwoDates(currency: Currencies, date1: string, date2: string) {
        this.dates = []
        this.dates.push(date1)
        this.dates.push(date2)
        this.answers = []
        this.answers.push(await Wallet.computeValue(this.wallet, currency, date1))
        this.answers.push(await Wallet.computeValue(this.wallet, currency, date2))
    }
    
    @then('the wallet value in the given currency should be {string}')
    public compareAnswer(expectedAnswer: string) {
        const actual = this.answers.shift() || 0
        const expected = parseFloat(expectedAnswer)

        //test actual with expected answer
        assert.strictEqual(actual, expected);
        //test actual with computesd value with rates defiend locally in scébario
        assert.strictEqual(actual, this.referenceRateWalletValue);
    }
    
    @then('the two values calculated should be different')
    compareTwoDifferentAnswers() {
        assert.notStrictEqual(this.answers[0],this.answers[1])
    }
    
    @then('the two values calculated should be identical')
    public compareTwoSameAnswers() {
        assert.strictEqual(this.answers.shift(),this.answers.shift())
    }

    public computeWalletValueLocal(baseCurrency: Currencies, date: string): number {
        let result = 0
        for(let stock of this.wallet.stocks) {
            let multiplier = this.referenceRatesAtDate?.get(date)?.get(stock.currency)?.get(baseCurrency) ? this.referenceRatesAtDate?.get(date)?.get(stock.currency)?.get(baseCurrency) : 0            
            if(multiplier)
                result += parseFloat((multiplier * stock.count).toFixed(2))
        }
        return parseFloat(result.toFixed(2))
    }

}