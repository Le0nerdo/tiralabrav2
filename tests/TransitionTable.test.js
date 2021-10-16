import { TransitionTable } from '../src/TranspositionTable'

test('remembers a value', () => {
	const tt = new TransitionTable(10)
	tt.put(1, 2)

	expect(tt.get(1)).toEqual(2)
})

test('follows size constraint', () => {
	const tt = new TransitionTable(1)
	tt.put(1, 2)
	tt.put(2, 3)

	expect(tt.get(1)).toEqual(null)
})

test('forgets oldest value on size limit', () => {
	const tt = new TransitionTable(3)
	tt.put(1, 2)
	tt.put(2, 3)
	tt.put(3, 4)
	tt.put(4, 5)

	expect(tt.get(1)).toEqual(null)
	expect(tt.get(2)).toEqual(3)
	expect(tt.get(3)).toEqual(4)
	expect(tt.get(4)).toEqual(5)
})
