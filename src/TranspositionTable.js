/**
 * A class for storing a limited amount of game state key, value pairs.
 * 
 * When the size limit is reached, the oldest pair is removed.
 */
class TransitionTable {
	constructor (size) {
		this.size = size
		this.map = new Map()
	}

	/**
	 * Adds a key value pair to the TransitionTable, if it does not exist already.
	 * 
	 * May remove oldest key, value pair.
	 * 
	 * @param {BigInt} key 
	 * @param {int} value 
	 * @returns null
	 */
	put(key, value) {
		if (this.map.has(key)) return

		if (this.map.size >= this.size) {
			this.map.delete(this.map.keys().next().value)
		}

		this.map.set(key, value)
	}

	/**
	 * Returns the value, corresponding to the key, if the key exists. If the key
	 * does not exist, null is returned.
	 * 
	 * @param {BigInt} key 
	 * @returns int
	 */
	get(key) {
		if (this.map.has(key)) {
			return this.map.get(key)
		}
		return null
	}
}

export { TransitionTable }
