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
My performance testing consists of using game states from http://blog.gamesolver.org/solving-connect-four/02-test-protocol/ and trying to solve their values. I selected "randomly" 10 states from Begin-Easy (Test_L1_R1) and 10 from Begin-Medium (Test_L1_R2).

I run the tests on node.js using 16% of i7-4790K that is running 4.5 GHz. The Begin-Easy test took about 107 seconds. In the Begin-Medium part the first state took 30 seconds and I cancelled at the second one after 10 hours.

## Graphical User Interface
Before pushing to GitHub, there is a manual test taking place. This is done by, hosting the website locally (check README) and opening the console, and checking that there are not too many red boxes. A 	hard-working tester may also check if he finds something that could be interpreted as a 7x6 grid.
