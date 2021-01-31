Feature: You want to compute the value of your empty wallet
    You want to know how much value your wallet is in a given currency

    Background: Wallet
        Given I have a wallet
    
    Scenario: The wallet has no stocks 
        Given no stocks are in the wallet
        When I ask to compute it's value in "EUR" from the rates of "2021-01-15"
        Then the wallet value in the given currency should be "0"
    
    Scenario: The wallet stocks are all at 0 
        Given the following stocks are in the wallet
            | USD         | 0  |
            | RUB         | 0  |
            | EUR         | 0  |
            | GBP         | 0  |
        When I ask to compute it's value in "EUR" from the rates of "2021-01-15"
        Then the wallet value in the given currency should be "0"