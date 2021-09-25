# Testing Document

## Unit Test
To see code coverage and test commands go to the README file.

Currently, only two classes are tested using unit tests. These are GameState and NegamaxAI.

The GameState class is properly tested, to make sure that it does not create problems. Invalid inputs are not tested, since we knowingly crash and burn in those cases.

The NegmaxAI class is not properly tested. Mainly only the method negamax is tested in some cases. The constructor and the nextMove method are tested a little, to check if something has been totally destroyed.

Reasons for not testing the rest.
* The GameBoard class is a fancy Graphical User Interface thing, that is simple and not crucial.
* The RandomAI class is just some random thing, that I rather delete than use to test if Math.random works.
* The app.js is just some temporary spaghetti. (There will most likely, be a class that takes most of the current work, from it.)

## Performance
Since NegamaxAI is still taking a very long time to calculate moves, there are no tests for speeds.

## Graphical User Interface
Before pushing to GitHub, there is a manual test taking place. This is done by, hosting the website locally (check README) and opening the console, and checking that there are not too many red boxes. A 	hard-working tester may also check if he finds something that could be interpreted as a 7x6 grid.
