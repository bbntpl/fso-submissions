import { Gender } from '../types';

export const isString = (text: unknown): text is string => {
	return typeof text === 'string' || text instanceof String;
};

export const isDate = (date: string): boolean => {
	return Boolean(Date.parse(date));
};

export const isEnumValue = <T extends { [s: string]: unknown }>(e: T) => (param: unknown): param is T[keyof T] => {
	return typeof param === 'string' && Object.values(e).includes(param as T[keyof T]);
};

export const assertNever = (value: never): never => {
	throw new Error(
		`Unhandled discriminated union member: ${JSON.stringify(value)}`
	);
};

export const parseString = (text: unknown, paramName: string) => {
	if (!text || !isString(text)) {
		throw new Error(`incorrect or missing ${paramName}`);
	}

	return text; 
};


export const parseDate = (date: unknown, paramName: string): string => {
	if (!date || !isString(date) || !isDate(date)) {
		throw new Error(`incorrect or missing ${paramName}`);
	}

	return date;
};


export const parseGender = (gender: unknown): Gender => {
	const isValidGender = isEnumValue(Gender);
	if (!gender || !isString(gender) || !isValidGender(gender)) {
		throw new Error('Incorrect or missing gender');
	}

	return gender;
};