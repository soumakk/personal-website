import E from '@unseenco/e'

class Clock {
	private static instance: Clock

	private readonly _init: number
	private _elapsed: number
	private _delta: number
	private _then: number

	constructor() {
		if (Clock.instance) return Clock.instance
		Clock.instance = this

		this._init = performance.now()
		this._elapsed = 0
		this._delta = 0
		this._then = this._init

		E.on('update', this.update)
	}

	get elapsed(): number {
		return this._elapsed
	}

	get delta(): number {
		return this._delta
	}

	private update = (): void => {
		const now = performance.now()
		this._elapsed = (now - this._init) / 1000
		this._delta = (now - this._then) / 1000
		this._then = now
	}

	public dispose(): void {
		E.off('update')
	}
}

export default Clock
