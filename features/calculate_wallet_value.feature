Feature: You want to compute the value of a wallet
    You want to know how much value your wallet is in a given currency

    Scenario: The wallet contains different currencies: 
        Given the following stocks are in the wallet
            | RUB         | 1234  |
            | USD         | 5.4   |
            | EUR         | 4.32  |
            | GBP         | 2.32  |
        When I ask to compute it's value in "EUR" from the rates of "2021-01-15"
        Then the wallet value in the given currency should be "25.24"

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
