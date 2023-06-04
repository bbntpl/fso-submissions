// import { errorHandling, parseTwoArguments } from './helper';

export const bmiCalculator = (height: number, mass: number): string => {
	const BMI = Number(mass) / ((Number(height) * 0.01) ** 2);
	const isHealthyRange = BMI >= 18.5 && BMI <= 24.9;
	const healthStatus = `${isHealthyRange ? 'healthy' : 'unhealthy'} weight`

	if (BMI <= 18.4) {
		return `Underweight (${healthStatus})`;
	} else if (isHealthyRange) {
		return `Normal range (${healthStatus})`;
	} else if (BMI >= 25 && BMI <= 29.9) {
		return `Overweight (${healthStatus})`;
	} else if (BMI >= 30) {
		return `Obese (${healthStatus})`
	} else {
		throw new Error('Provided values must be integers');
	}
}

// const { value1: height, value2: mass } = errorHandling(parseTwoArguments, process.argv);

// errorHandling(bmiCalculator, height, mass);