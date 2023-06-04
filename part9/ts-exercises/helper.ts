interface Operands {
	value1: number;
	value2: number;
}

interface ExecFnInterface {
	(...args: any[]): any;
}

export const parseTwoArguments = (args: string[]): Operands => {
	if (args.length < 4) throw new Error('Not enough arguments');
	if (args.length > 4) throw new Error('Too many arguments');

	if (args.slice(2).every(arg => !isNaN(Number(arg)))) {
		return {
			value1: Number(args[2]),
			value2: Number(args[3])
		}
	} else {
		throw new Error('Provided values were not numbers!');
	}
}

export const parseMultipleArguments = (args: string[]): number[]  => {
	if (args.slice(2).every(arg => !isNaN(Number(arg)))) {
		return args.slice(2).map(arg => Number(arg));
	} else {
		throw new Error('Provided values were not numbers!');
	}
}

export function errorHandling(execFn: ExecFnInterface, ...args: any[]) {
	try {
		const result = execFn(...args);
		return result;
	} catch (error: unknown) {
		let errorMessage = 'Something bad happened.'
		if (error instanceof Error) {
			errorMessage += ' Error: ' + error.message;
		}
		console.log(errorMessage);
	}
}