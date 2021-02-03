Feature: You want to compute the value of your empty wallet
    You want to know how much value your wallet is in a given currency

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
    
    Scenario: The wallet has no stocks 
        Given no stocks are in the wallet
        When I ask to compute it's value in "EUR" from the rates of "2021-01-15"
        Then the wallet value in the given currency should be "0"
    
    Scenario: The wallet stocks are all at 0 
        Given the following stocks are in the wallet
            | USD         | 0  |
            | GBP         | 0  |
            | EUR         | 0  |
        When I ask to compute it's value in "EUR" from the rates of "2021-01-15"
        Then the wallet value in the given currency should be "0"