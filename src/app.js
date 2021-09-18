import { GameState } from './GameState.js'
import { GameBoard } from './GameBoard.js'
import { RandomAI } from './AIs/RandomAI.js'

/**
 * The script that is invoked from html.
 * 
 * The current version is only set up for testing and will temporarily stay that way for flexibility.
 */
const state = new GameState()
const board = new GameBoard(state)
const player1 = new RandomAI()
const player2 = new RandomAI()

board.draw()
// eslint-disable-next-line no-constant-condition
while (true) {
	const move1 = player1.nextMove(state)
	if (!state.canPlay(move1)) {
		console.log(`Player red Made a illegal move ${move1}`)
		break
	}
	if (state.isWinningMove(move1)) {
		state.play(move1)
		board.draw()
		console.log('Player red Wins')
		break
	}
	state.play(move1)
	board.draw()

	const move2 = player2.nextMove(state)
	if (state.isWinningMove(move2)) {
		state.play(move2)
		board.draw()
		console.log('Player yellow Wins')
		break
	}
	if (!state.canPlay(move2)) {
		console.log(`Player yellow Made a illegal move ${move2}`)
		break
	}
	state.play(move2)
	board.draw()
}
