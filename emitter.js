const handlerSymbol = Symbol.for("handler");

export class Emitter {
	[handlerSymbol];

	addSignal = (signal) => {
		this[handlerSymbol].set(signal, []);
	};

	/**
	 * Emitter constructor.
	 * @param {String} name name for this emitter
	 */
	constructor(name = 'Emitter') {
		this[handlerSymbol] = new Map();
		this.emitterName = name;
	}

	on = (signal, callback) => {
		if (!this[handlerSymbol].get(signal)) {
			throw new Error(
				`[${this.emitterName}] Signal '${signal}' unknown (use one of these [${[
					...this[handlerSymbol].keys(),
				]}])`,
			);
		}
		this[handlerSymbol].get(signal).push(callback);
	};

	emit = (signal, data) => {
		for (const handler of this[handlerSymbol].get(signal)) {
			handler(data);
		}
	};
}
