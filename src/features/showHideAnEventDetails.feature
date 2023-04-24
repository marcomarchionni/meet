Feature: Show/hide event details

Scenario: An event element is collapsed by default

Given the app displayed a list of events
When the user does not interact with any event element
Then the event element should be collapsed

Scenario: User can expand an event to see its details

Given the app displayed a list of events
When the user clicks on an event element button
Then the event element should expand to show the event details

Scenario: User can collapse an event to hide its details

Given an event element is expanded
When the user clicks on an event element button
Then the event element should collapse and hide its details