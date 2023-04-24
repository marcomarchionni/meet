Feature: Specify number of events

Scenario: When a user hasn't specified a number, thirtytwo is the defaut number

Given the user hasn't specified the number of events to display
When the app displays a list of events
Then the max number of events displayed at once will not be greater than thirtytwo

Scenario: User can change the number of events they want to see

Given the max number of events displayed at once was thirtytwo
When the user change the number of the events to display to five
Then the max number of events displayed at once will be five