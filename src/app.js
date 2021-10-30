import { GameState } from './GameState.js'
import { GameBoard } from './GameBoard.js'
import { NegamaxAI } from './AIs/NegamaxAI.js'

/**
 * The script that is invoked from html.
 * 
 * The current version is only set up for testing and will temporarily stay that way for flexibility.
 */
const sleep = (time) => {
	return new Promise(resolve => setTimeout(resolve, time))
}

const states = [
	'7134774225575',
	'2171577253',
	'47713114137731',
	'43654255',
	'64732327731652',
	'56134544742566',
	'775423655217723322774542556',
	'5343764533155265',
	'2664321635126321117',
	'1366264212241115'
]

const stateString = states[Math.floor(Math.random() * states.length)]
const afterDrawSleep = 100

async function gameloop() {
	const state = new GameState(stateString)
	const board = new GameBoard(state)
	board.draw(state)
	await sleep(afterDrawSleep)
	const player1 = new NegamaxAI(state)
	const player2 = new NegamaxAI(state)
	const moves = []
	// eslint-disable-next-line no-constant-condition
	while (true) {
		if (state.isFull()) break
		const move1 = player1.nextMove(state)
		moves.push(move1)
		if (!state.canPlay(move1)) {
			console.log(`Player red Made a illegal move ${move1}`)
			break
		}
		if (state.isWinningMove(move1)) {
			state.play(move1)
			board.draw(state)
			await sleep(afterDrawSleep)
			console.log('Player red Wins')
			break
		}
		state.play(move1)
		board.draw(state)
		await sleep(afterDrawSleep)

		if (state.isFull()) break
		const move2 = player2.nextMove(state)
		moves.push(move1)
		if (state.isWinningMove(move2)) {
			state.play(move2)
			board.draw(state)
			await sleep(afterDrawSleep)
			console.log('Player yellow Wins')
			break
		}
		if (!state.canPlay(move2)) {
			console.log(`Player yellow Made a illegal move ${move2}`)
			break
		}
		state.play(move2)
		board.draw(state)
		await sleep(afterDrawSleep)
	}

	console.log(moves)
}

gameloop()