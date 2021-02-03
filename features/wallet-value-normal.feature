Feature: You want to compute the value of your normal wallet
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

    Scenario: The wallet contains different currencies: 
        Given the following stocks are in the wallet
            | GBP         | 10 |
            | USD         | 10 |
            | EUR         | 5  |
        When I ask to compute it's value in "EUR" from the rates of "2021-01-15"
        Then the wallet value in the given currency should be "24.5"

    Scenario: The wallet contains only the same currency it wants its total value to be in  
        Given the following stocks are in the wallet
            | EUR         | 1 |
        When I ask to compute it's value in "EUR" from the rates of "2021-01-15"
        Then the wallet value in the given currency should be "1"
    
    Scenario: The wallet only has the same currency it wants its total value in 
        Given the following stocks are in the wallet
            | USD         | 1  |
        When I ask to compute it's value in "EUR" from the rates of "2021-01-15"
        Then the wallet value in the given currency should be "0.83"