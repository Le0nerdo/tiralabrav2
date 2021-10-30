import { NegamaxAI } from '../../src/AIs/NegamaxAI'
import { GameState } from '../../src/GameState'

/**
 * Some of the test cases are test cases for benchmark data found on
 * http://blog.gamesolver.org/solving-connect-four/02-test-protocol/
 */

test('ordering is correct with width of 7', () => {
	const state = new GameState()
	const ai = new NegamaxAI(state)

	expect(ai.order).toStrictEqual(new Array(3, 2, 4, 1, 5, 0, 6))
})

test('close to end negmax value test', () => {
	const state = new GameState([
		[1, 1, 2, 1, 1, 1],
		[2, 2, 1, 0, 0, 0],
		[1, 2, 1, 2, 1, 1],
		[1, 2, 1, 2, 1, 2],
		[2, 1, 2, 1, 1, 2],
		[2, 1, 2, 1, 2, 2],
		[2, 2, 1, 2, 0, 0],
	])
	const ai = new NegamaxAI(state)
	expect(ai.solve(state, -50, 50)).toBe(-1)
})

test('close to end negmax value test2', () => {
	const state = new GameState([
		[1, 1, 2, 1, 1, 0],
		[2, 2, 1, 0, 0, 0],
		[1, 2, 1, 2, 1, 0],
		[1, 2, 1, 2, 1, 2],
		[2, 1, 2, 1, 1, 2],
		[2, 1, 2, 1, 2, 2],
		[2, 0, 0, 0, 0, 0],
	])
	const ai = new NegamaxAI(state)
	expect(ai.solve(state, -50, 50)).toBe(1)
})

test('close to end negmax value test3', () => {
	const state = new GameState('67152117737262713366376314254')
	const ai = new NegamaxAI(state)
	expect(ai.solve(state, -50, 50)).toBe(6)
})

test('close to end negmax value test4', () => {
	const state = new GameState('6216633712715125334265163163777225')
	const ai = new NegamaxAI(state)
	expect(ai.solve(state, -50, 50)).toBe(-3)
})

test('close to end negmax value test5', () => {
	const state = new GameState('47715713331437527153255735112')
	const ai = new NegamaxAI(state)
	expect(ai.solve(state, -50, 50)).toBe(0)
})

test('midgame negmax value test 1', () => {
	const state = new GameState('31124166611476652461')
	const ai = new NegamaxAI(state)
	expect(ai.solve(state, -50, 50)).toBe(-7)
})

test('midgame negmax value test 2', () => {
	const state = new GameState('76543123446324223431432127')
	const ai = new NegamaxAI(state)
	expect(ai.solve(state, -50, 50)).toBe(-2)
})

test('midgame negmax value test 3', () => {
	const state = new GameState('36466712613373735727361')
	const ai = new NegamaxAI(state)
	expect(ai.solve(state, -50, 50)).toBe(3)
})

test('midgame negmax value test 4', () => {
	const state = new GameState('5746741223753516274755')
	const ai = new NegamaxAI(state)
	expect(ai.solve(state, -50, 50)).toBe(8)
})

test('midgame negmax value test 4 XD', () => {
	const state = new GameState('5746741223753516274755')
	const ai = new NegamaxAI(state)
	expect(ai.negamax(state, -50, 50)).toBe(8)
})


test('nextMove follows game rules', () => {
	const state = new GameState('22647455554314246733661634615122372377511')
	const ai = new NegamaxAI(state)
	expect(ai.nextMove(state)).toBe(6)
})

test('nextMove is not totally broken', () => {
	const state = new GameState([
		[1, 1, 2, 1, 1, 1],
		[2, 2, 1, 0, 0, 0],
		[1, 2, 1, 2, 1, 1],
		[1, 2, 1, 2, 1, 2],
		[2, 1, 2, 1, 1, 2],
		[2, 1, 2, 1, 2, 2],
		[2, 2, 1, 2, 2, 0],
	])
	const ai = new NegamaxAI(state)
	expect(ai.nextMove(state)).toBe(6)
})

test('nextMove uses winning move', () => {
	const state = new GameState([
		[1, 1, 2, 1, 1, 1],
		[2, 2, 1, 1, 0, 0],
		[1, 2, 1, 2, 1, 1],
		[1, 2, 1, 2, 1, 2],
		[2, 1, 2, 1, 1, 2],
		[2, 1, 2, 1, 2, 2],
		[2, 2, 1, 2, 2, 0],
	])
	const ai = new NegamaxAI(state)
	expect(ai.nextMove(state)).toBe(6)
})
