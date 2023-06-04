interface Operands {
	value1: number;
	value2: number;
}

type AnyFunction = (...args: never[]) => unknown;

export const parseTwoArguments = (args: string[]): Operands | undefined => {
	if (args.length < 4) throw new Error('Not enough arguments');
	if (args.length > 4) throw new Error('Too many arguments');

	if (args.slice(2).every(arg => !isNaN(Number(arg)))) {
		return {
			value1: Number(args[2]),
			value2: Number(args[3])
		};
	} else {
		throw new Error('Provided values were not numbers!');
	}
};

export const parseMultipleArguments = (args: string[]): number[] => {
	if (args.slice(2).every(arg => !isNaN(Number(arg)))) {
		return args.slice(2).map(arg => Number(arg));
	} else {
		throw new Error('Provided values were not numbers!');
	}
};

export function errorHandling<F extends AnyFunction>(execFn: F, ...args: Parameters<F>): ReturnType<F> | undefined {
	try {
		const result = execFn(...args) as ReturnType<F>;
		console.log(result);
		return result;
	} catch (error: unknown) {
		let errorMessage = 'Something bad happened.';
		if (error instanceof Error) {
			errorMessage += ' Error: ' + error.message;
		}
		console.log(errorMessage);
		return undefined;
	}
}