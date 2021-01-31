import { Currencies } from "./enums/currencies.enum"

export class Stock {
    currency: Currencies
    count: number

  constructor(currency: Currencies, count: number = 0) {
    this.currency = currency
    this.count = parseFloat(count.toFixed(2))
  }

}