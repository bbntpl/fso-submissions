// import { errorHandling, parseMultipleArguments } from './helper';

type RatingOptions = 1 | 2 | 3;
type RatingDescriptions = 'eres basura' | 'no esta mal' | 'bien hecho';

interface Rating {
	rating: RatingOptions;
	ratingDescription: RatingDescriptions;
}

interface ExerciseResult extends Rating {
	periodLength: number;
	trainingDays: number;
	success: boolean;
	target: number;
	average: number;
}

export const exerciseCalculator = (days: number[], target: number): ExerciseResult => {
	if (!days.every(day => typeof day === 'number') || typeof target !== 'number') {
		throw new Error('malformatted parameters');
	}
	if (days.length === 0 || !target) {
		throw new Error('parameters missing');
	}

	const TARGET = target;
	const ratingDescriptions: RatingDescriptions[] = [
		'eres basura',
		'no esta mal',
		'bien hecho'
	];

	const average = days.reduce((sum, d) => sum + d, 0) / days.length;

	const calculateRating = (average: number) => {
		let rating: RatingOptions = 1;
		if (average >= TARGET) {
			rating = 3;
		} else if (average / 2 <= TARGET) {
			rating = 2;
		}
		return {
			ratingDescription: ratingDescriptions[rating - 1],
			rating
		};
	};

	const ratingObj = calculateRating(average);

	const result = {
		periodLength: days.length,
		trainingDays: days.filter(day => day > 0).length,
		rating: ratingObj.rating,
		ratingDescription: ratingObj.ratingDescription,
		target: TARGET,
		success: average >= TARGET,
		average
	};

	return result;
};

// const args = errorHandling(parseMultipleArguments, process.argv);

// console.log(errorHandling(exerciseCalculator, ...args))