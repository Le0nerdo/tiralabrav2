import { NegamaxAI } from '../../src/AIs/NegamaxAI'
import { GameState } from '../../src/GameState'

const medium = false // false means easy

test('stress test 0', () => {
	const state = medium ? new GameState('13265113127132') : new GameState('6571456427113')
	const ai = new NegamaxAI(state)
	const answer = medium ? -3 : 11
	expect(ai.solve(state)).toBe(answer)
})

test('stress test 1', () => {
	const state = medium ? new GameState('77541') : new GameState('362236')
	const ai = new NegamaxAI(state)
	const answer = medium ? 6 : 17
	expect(ai.solve(state)).toBe(answer)
})

test('stress test 2', () => {
	const state = medium ? new GameState('77643424') :  new GameState('457672175556')
	const ai = new NegamaxAI(state)
	const answer = medium ? -6 : 9
	expect(ai.solve(state)).toBe(answer)
})

test('stress test 3', () => {
	const state = medium ? new GameState('4147') : new GameState('25474623')
	const ai = new NegamaxAI(state)
	const answer = medium ? 10 : 13
	expect(ai.solve(state)).toBe(answer)
})

test('stress test 4', () => {
	const state = medium ? new GameState('2116327323743') : new GameState('11517653734222')
	const ai = new NegamaxAI(state)
	const answer = medium ? 5 : 10
	expect(ai.solve(state)).toBe(answer)
})

test('stress test 5', () => {
	const state = medium ? new GameState('64235467265221') : new GameState('33142135454161')
	const ai = new NegamaxAI(state)
	const answer = medium ? -2 : -9
	expect(ai.solve(state)).toBe(answer)
})

test('stress test 6', () => {
	const state = medium ? new GameState('7722375364') : new GameState('12465256156552')
	const ai = new NegamaxAI(state)
	const answer = medium ? -4 : -8
	expect(ai.solve(state)).toBe(answer)
})

test('stress test 7', () => {
	const state = medium ? new GameState('134214365564') : new GameState('67125143564273')
	const ai = new NegamaxAI(state)
	const answer = medium ? -4 : 11
	expect(ai.solve(state)).toBe(answer)
})

test('stress test 8', () => {
	const state = medium ? new GameState('2474276') : new GameState('224427')
	const ai = new NegamaxAI(state)
	const answer = medium ? 6 : 17
	expect(ai.solve(state)).toBe(answer)
})

test('stress test 9', () => {
	const state = medium ? new GameState('7272331') : new GameState('7715142517313')
	const ai = new NegamaxAI(state)
	const answer = medium ? 5 : 11
	expect(ai.solve(state)).toBe(answer)
})
