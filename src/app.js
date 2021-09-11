import { GameState } from './GameState'
import { GameBoard } from './GameBoard'
import { RandomAI } from './AIs/RandomAI'

const state = GameState()
const board = GameBoard(state)
const player1 = RandomAI()
const player2 = RandomAI()

// eslint-disable-next-line no-constant-condition
while (true) {
	const move1 = player1.nextMove(state)
	if (!state.canPlay(move1)) {
		console.log(`Player 1 Made a illegal move ${move1}`)
		break
	}
	if (state.isWinningMove(move1)) {
		state.play(move1)
		console.log('Player 1 Wins')
		break
	}
	state.play(move1)
	board.redraw()

	const move2 = player2.nextMove(state)
	if (state.isWinningMove(move2)) {
		state.play(move2)
		console.log('Player 2 Wins')
		break
	}
	if (!state.canPlay(move1)) {
		console.log(`Player 1 Made a illegal move ${move1}`)
		break
	}
	state.play(move2)
	board.redraw()
}
