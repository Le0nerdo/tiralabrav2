import { GameState } from './GameState.js'
import { GameBoard } from './GameBoard.js'
import { NegamaxAI } from './AIs/NegamaxAI.js'

/**
 * The script that is invoked from html.
 * 
 * The current version is only set up for testing and will temporarily stay that way for flexibility.
 */
const sleep = () => {
	return new Promise(resolve => setTimeout(resolve, 500))
}
async function gameloop() {
	const state = new GameState([
		[1, 1, 2, 1, 0, 0],
		[2, 0, 0, 0, 0, 0],
		[1, 2, 0, 0, 0, 0],
		[1, 2, 1, 2, 1, 2],
		[2, 1, 2, 1, 1, 0],
		[2, 1, 2, 0, 0, 0],
		[2, 0, 0, 0, 0, 0],
	])
	const board = new GameBoard(state)
	const player1 = new NegamaxAI(state)
	const player2 = new NegamaxAI(state)

	board.draw(state)
	await sleep()
	// eslint-disable-next-line no-constant-condition
	while (true) {
		if (state.isFull()) break
		const move1 = player1.nextMove(state)
		if (!state.canPlay(move1)) {
			console.log(`Player red Made a illegal move ${move1}`)
			break
		}
		if (state.isWinningMove(move1)) {
			state.play(move1)
			board.draw(state)
			console.log('Player red Wins')
			break
		}
		state.play(move1)
		board.draw(state)
		await sleep()

		if (state.isFull()) break
		const move2 = player2.nextMove(state)
		if (state.isWinningMove(move2)) {
			state.play(move2)
			board.draw(state)
			console.log('Player yellow Wins')
			break
		}
		if (!state.canPlay(move2)) {
			console.log(`Player yellow Made a illegal move ${move2}`)
			break
		}
		state.play(move2)
		board.draw(state)
		await sleep()
	}
}

gameloop()