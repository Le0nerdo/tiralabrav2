/** @class RandomAI is an AI that picks randomly from the available moves.*/
class RandomAI {
	/**
	 * Gives the next move that the AI does.
	 * 
	 * @param {Object} state The current game state. 
	 * @returns The next move.
	 */
	nextMove(state) {
		const moves = []
		for (let i = 0; i < state.WIDTH; i++) {
			if (state.canPlay(i)) moves.push(i)
		}
		return moves[Math.floor(Math.random() * moves.length)]
	}
}

export { RandomAI }
