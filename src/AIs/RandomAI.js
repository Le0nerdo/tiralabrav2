class RandomAI {
	nextMove(state) {
		const moves = []
		for (let i = 0; i < state.WIDTH; i++) {
			if (state.canPlay(i)) moves.push(i)
		}
		return moves[Math.floor(Math.random() * moves.length)]
	}
}

export { RandomAI }
