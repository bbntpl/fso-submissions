import { parseDate, parseGender, parseString } from '.';
import { NewPatient } from '../types';

const toNewPatient = (object: unknown): NewPatient => {
	if (!object || typeof object !== 'object') {
		throw new Error('Parameters are missing/object is required');
	}

	if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
		const newPatient: NewPatient = {
			name: parseString(object.name, 'name'),
			dateOfBirth: parseDate(object.dateOfBirth, 'dateOfBirth'),
			ssn: parseString(object.ssn, 'ssn'),
			gender: parseGender(object.gender),
			occupation: parseString(object.occupation, 'occupation')
		};
		return newPatient;
	}

	throw new Error('Required properties are missing');
};

export default toNewPatient;