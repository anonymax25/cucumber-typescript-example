Feature: You want to compute the value of a wallet at different dates

    Background: Wallet
        Given I have a wallet

    Scenario: Two identical wallet have their values computed at the same date: 
        Given the following stocks are in the wallet
            | RUB         | 3456  |
            | USD         | 34.01 |
            | EUR         | 4.32  |
            | GBP         | 1.32  |
        When I ask to compute it's value in "EUR" from the rates of "2021-01-15" and then from the rates of "2021-01-15"
        Then the two values calculated should be identical
    
    Scenario: The wallet's value is computed at two different dates: 
        Given the following stocks are in the wallet
            | RUB         | 3456  |
            | USD         | 34.01 |
            | EUR         | 4.32  |
            | GBP         | 1.32  |
        When I ask to compute it's value in "EUR" from the rates of "2021-01-15" and then from the rates of "2018-03-25"
        Then the two values calculated should be different