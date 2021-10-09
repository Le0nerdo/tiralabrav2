import { GameState } from '../src/GameState'

test('game board array is understoond and reconstructed correctly', () => {
	const state = new GameState([
		[2, 2, 1, 2, 1, 2],
		[2, 2, 1, 2, 1, 2],
		[1, 1, 2, 1, 1, 2],
		[1, 1, 2, 1, 2, 1],
		[2, 2, 1, 1, 1, 2],
		[1, 2, 1, 2, 1, 2],
		[2, 1, 2, 1, 1, 2]
	])

	expect(state.toArray()).toStrictEqual([
		[2, 2, 1, 2, 1, 2],
		[2, 2, 1, 2, 1, 2],
		[1, 1, 2, 1, 1, 2],
		[1, 1, 2, 1, 2, 1],
		[2, 2, 1, 1, 1, 2],
		[1, 2, 1, 2, 1, 2],
		[2, 1, 2, 1, 1, 2]
	])
})

test('nbMoves gives correct number of moves', () => {
	const state = new GameState([
		[1, 2, 0, 0, 0, 0],
		[2, 1, 0, 0, 0, 0],
		[1, 2, 0, 0, 0, 0],
		[2, 1, 0, 0, 0, 0],
		[1, 0, 0, 0, 0, 0],
		[2, 0, 0, 0, 0, 0],
		[1, 0, 0, 0, 0, 0],
	])

	expect(state.nbMoves()).toBe(11)
})

test('canPlay returns false on full row', () => {
	const state = new GameState([
		[0, 0, 0, 0, 0, 0],
		[1, 2, 1, 2, 1, 2], // <- 1
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
	])

	expect(state.canPlay(1)).toBe(false)
})

test('canPlay returns true when space in row', () => {
	const state = new GameState([
		[1, 2, 0, 0, 0, 0],
		[2, 1, 0, 0, 0, 0],
		[1, 2, 0, 0, 0, 0], // <- 2
		[2, 1, 0, 0, 0, 0],
		[1, 0, 0, 0, 0, 0],
		[2, 0, 0, 0, 0, 0],
		[1, 0, 0, 0, 0, 0],
	])

	expect(state.canPlay(2)).toBe(true)
})

test('Creates empty board on default', () => {
	const state = new GameState()
	expect(state.position).toBe(BigInt(0))
})

test('Sanity check for play', () => {
	const state = new GameState([
		[1, 2, 0, 0, 0, 0],
		[2, 1, 0, 0, 0, 0],
		[1, 2, 0, 0, 0, 0],
		[2, 1, 0, 0, 0, 0],
		[1, 0, 0, 0, 0, 0], // <- 2
		[2, 0, 0, 0, 0, 0],
		[1, 0, 0, 0, 0, 0],
	])
	state.play(4)

	expect(state.moves).toBe(12)
	expect(state.toArray()).toStrictEqual([
		[1, 2, 0, 0, 0, 0],
		[2, 1, 0, 0, 0, 0],
		[1, 2, 0, 0, 0, 0],
		[2, 1, 0, 0, 0, 0],
		[1, 2, 0, 0, 0, 0],
		[2, 0, 0, 0, 0, 0],
		[1, 0, 0, 0, 0, 0],
	])
})

test('Close but no win - |', () => {
	const state = new GameState([
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[1, 2, 0, 0, 0, 0],
		[2, 2, 2, 1, 0, 0],
		[1, 1, 2, 1, 0, 0],
		[2, 2, 2, 1, 0, 0],
		[1, 1, 1, 2, 0, 0], // <- 1
	])

	expect(state.isWinningMove(6)).toBe(false)
})

test('Winning vertically', () => {
	const state = new GameState([
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[1, 1, 1, 0, 0, 0], // <- 1
		[2, 2, 2, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0]
	])

	expect(state.isWinningMove(2)).toBe(true)
})

test('Winning horizontally', () => {
	const state = new GameState([
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[1, 2, 0, 0, 0, 0],
		[1, 2, 0, 0, 0, 0],
		[1, 2, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0], // <- 1
		[0, 0, 0, 0, 0, 0],
	])

	expect(state.isWinningMove(5)).toBe(true)
})

test('Close but no win / \\', () => {
	const state = new GameState([
		[0, 0, 0, 0, 0, 0],
		[1, 0, 0, 0, 0, 0],
		[2, 1, 0, 0, 0, 0],
		[2, 2, 1, 2, 0, 0],
		[1, 1, 1, 0, 0, 0], // <- 2
		[1, 2, 1, 2, 0, 0],
		[2, 0, 0, 0, 0, 0],
	])

	expect(state.isWinningMove(4)).toBe(false)
})

test('Winning \\', () => {
	const state = new GameState([
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[1, 1, 0, 0, 0, 0],
		[2, 1, 2, 2, 0, 0],
		[1, 1, 0, 0, 0, 0], // <- 2
		[1, 2, 0, 0, 0, 0],
		[2, 0, 0, 0, 0, 0],
	])

	expect(state.isWinningMove(4)).toBe(true)
})

test('Winning /', () => {
	const state = new GameState([
		[0, 0, 0, 0, 0, 0],
		[2, 0, 0, 0, 0, 0],
		[1, 2, 0, 0, 0, 0],
		[2, 1, 0, 0, 0, 0], // <- 2
		[1, 2, 1, 2, 0, 0],
		[1, 0, 0, 0, 0, 0],
		[1, 0, 0, 0, 0, 0],
	])

	expect(state.isWinningMove(3)).toBe(true)
})

test('Combo breaks on -', () => {
	const state = new GameState([
		[1, 0, 0, 0, 0, 0],
		[2, 0, 0, 0, 0, 0],
		[1, 0, 0, 0, 0, 0],
		[2, 0, 0, 0, 0, 0],
		[1, 0, 0, 0, 0, 0],
		[2, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0], // <- 2
	])

	expect(state.isWinningMove(6)).toBe(false)
})

test('Combo breaks on |', () => {
	const state = new GameState([
		[1, 2, 1, 1, 2, 0], // <- 1
		[2, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0]
	])

	expect(state.isWinningMove(0)).toBe(false)
})

test('Combo breaks on \\', () => {
	const state = new GameState([
		[0, 0, 0, 0, 0, 0],
		[1, 0, 0, 0, 0, 0],
		[2, 1, 2, 2, 0, 0], // <- 1
		[1, 2, 1, 1, 0, 0],
		[2, 1, 2, 0, 0, 0],
		[2, 1, 0, 0, 0, 0],
		[1, 0, 0, 0, 0, 0],
	])

	expect(state.isWinningMove(2)).toBe(false)
})

test('Combo breaks on //', () => {
	const state = new GameState([
		[1, 0, 0, 0, 0, 0],
		[2, 1, 0, 0, 0, 0],
		[2, 1, 1, 0, 0, 0],
		[2, 2, 1, 2, 0, 0],
		[1, 2, 1, 2, 0, 0], // <- 1
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0]
	])

	expect(state.isWinningMove(6)).toBe(false)
})

test('isFull returns true on full board', () => {
	const state = new GameState([
		[2, 2, 1, 2, 1, 2],
		[2, 2, 1, 2, 1, 2],
		[1, 1, 2, 1, 1, 2],
		[1, 1, 2, 1, 2, 1],
		[2, 2, 1, 1, 1, 2],
		[1, 2, 1, 2, 1, 2],
		[2, 1, 2, 1, 1, 2]
	])

	expect(state.isFull()).toBe(true)
})

test('isFull returns false on not full board', () => {
	const state = new GameState([
		[1, 0, 0, 0, 0, 0],
		[2, 1, 0, 0, 0, 0],
		[2, 1, 1, 0, 0, 0],
		[2, 2, 1, 2, 0, 0],
		[1, 2, 1, 2, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0]
	])

	expect(state.isFull()).toBe(false)
})

test('game state is created correctly out of string', () => {
	const state = new GameState('67152117737262713366376314254')
	expect(state.moves).toBe(29)
	expect(state.toArray()).toStrictEqual([
		[1, 2, 1, 2, 1, 0],
		[1, 2, 2, 1, 0, 0],
		[2, 1, 2, 1, 2, 0],
		[2, 1, 0, 0, 0, 0],
		[2, 2, 0, 0, 0, 0],
		[1, 1, 1, 2, 1, 0],
		[2, 2, 1, 1, 1, 2],
	])
})
