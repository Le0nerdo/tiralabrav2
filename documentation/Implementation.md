# Implementation document

## Project Structure.
The game state class takes care of the game state, and information related to it (isFull, isWinningMove...) and the NegamaxAI class calculates the next move from a given game state. The TransitionTable class is used by the NegamaxAI class for storing calculated state values. All other classes/files exist only for visualization.

## Implemented time and space complexities
I would claim that the time complexity is exponential.

Space complexity is most likely dominated by the transposition table that currently holds up to 10^5 BigInt, Int pairs.

## Sources
I am using Pascal Pons [Blog](http://blog.gamesolver.org/) as a guide.
