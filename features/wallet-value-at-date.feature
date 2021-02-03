Feature: You want to compute the value of your wallet at set dates

    Background: Wallet
        Given I have a wallet 
        And the rates at the time of "2021-01-15" are
            | GBP | USD | 1.37 |
            | GBP | EUR | 1.12 |
            | GBP | GBP | 1    |
            | EUR | USD | 1.22 |
            | EUR | GBP | 0.89 |
            | EUR | EUR | 1    |
            | USD | EUR | 0.83 |
            | USD | GBP | 0.74 |
            | USD | USD | 1    |
        And the rates at the time of "2018-03-25" are
            | GBP | USD | 1.36 |
            | GBP | EUR | 1.12 |
            | GBP | GBP | 1.12 |
            | EUR | USD | 1.21 |
            | EUR | GBP | 0.89 |
            | EUR | EUR | 0.89 |
            | USD | EUR | 0.82 |
            | USD | GBP | 0.73 |
            | USD | USD | 0.73 |

    Scenario: Two identical wallet have their values computed at the same date: 
        Given the following stocks are in the wallet
            | GBP         | 10 |
            | USD         | 10 |
            | EUR         | 5  |
        When I ask to compute it's value in "EUR" from the rates of "2021-01-15" and then from the rates of "2021-01-15"
        Then the two values calculated should be identical
    
    Scenario: The wallet's value is computed at two different dates: 
        Given the following stocks are in the wallet
            | RUB         | 10 |
            | USD         | 10 |
            | EUR         | 5  |
        When I ask to compute it's value in "EUR" from the rates of "2021-01-15" and then from the rates of "2018-03-25"
        Then the two values calculated should be different