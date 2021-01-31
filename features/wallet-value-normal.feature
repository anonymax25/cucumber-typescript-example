Feature: You want to compute the value of a normal wallet
    You want to know how much value your wallet is in a given currency

    Background: Wallet
        Given I have a wallet

    Scenario: The wallet contains different currencies: 
        Given the following stocks are in the wallet
            | RUB         | 1234  |
            | USD         | 5.4   |
            | EUR         | 4.32  |
            | GBP         | 2.32  |
        When I ask to compute it's value in "EUR" from the rates of "2021-01-15"
        Then the wallet value in the given currency should be "25.24"

    Scenario: The wallet contains only the same currency it wants its total value to be in  
        Given the following stocks are in the wallet
            | EUR         | 4.32  |
        When I ask to compute it's value in "EUR" from the rates of "2021-01-15"
        Then the wallet value in the given currency should be "4.32"
    
    Scenario: The wallet only has the same currency it wants its total value  
        Given the following stocks are in the wallet
            | USD         | 4.32  |
        When I ask to compute it's value in "GBP" from the rates of "2021-01-15"
        Then the wallet value in the given currency should be "3.56"