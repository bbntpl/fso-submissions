import { Gender, NewPatient } from './types';

const isString = (text: unknown): text is string => {
	return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
	return Boolean(Date.parse(date));
};

const isEnumValue = <T extends { [s: string]: unknown}>(e: T) => (param: unknown): param is T[keyof T] => {
	return typeof param === 'string' && Object.values(e).includes(param as T[keyof T]);
};

const parseName = (name: unknown): string => {
	if (!name || !isString(name)) {
		throw new Error('Incorrect or missing name');
	}

	return name;
};

const parseDate = (date: unknown): string => {
	if (!date || !isString(date) || !isDate(date)) {
		throw new Error('Incorrect or missing date');
	}

	return date;
};

const parseSSN = (ssn: unknown): string => {
	if (!ssn || !isString(ssn)) {
		throw new Error('Incorrect or missing ssn');
	}

	return ssn;
};

const parseGender = (gender: unknown): Gender => {
	const isValidGender = isEnumValue(Gender);
	if (!gender || !isString(gender) || !isValidGender(gender)) {
		throw new Error('Incorrect or missing gender');
	}

	return gender;
};


const parseOccupation = (occupation: unknown): string => {
	if (!occupation || !isString(occupation)) {
		throw new Error('Incorrect or missing occupation');
	}

	return occupation;
};

export const toNewPatient = (object: unknown): NewPatient => {
	if (!object || typeof object !== 'object') {
		throw new Error('Parameters are missing/object is required');
	}

	if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
		const newPatient: NewPatient = {
			name: parseName(object.name),
			dateOfBirth: parseDate(object.dateOfBirth),
			ssn: parseSSN(object.ssn),
			gender: parseGender(object.gender),
			occupation: parseOccupation(object.occupation)
		};
		return newPatient;
	}

	throw new Error('Required properties are missing');
};