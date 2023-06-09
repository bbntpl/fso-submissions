import { assertNever, parseDate, parseString } from '.';
import { Diagnosis, EntryTypeWithoutBase, EntryWithoutId } from '../types';

export const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
	if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
		return [] as Array<Diagnosis['code']>;
	}

	return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const entryTypeSelection = (entry: EntryTypeWithoutBase):
	EntryTypeWithoutBase | undefined | void => {
	switch (entry.type) {
		case 'HealthCheck':
			return {
				type: entry.type,
				healthCheckRating: entry.healthCheckRating
			};
		case 'Hospital':
			return {
				type: entry.type,
				discharge: entry.discharge
			};
		case 'OccupationalHealthcare':
			return {
				type: entry.type,
				employerName: entry.employerName,
				sickLeave: entry.sickLeave
			};
		default:
			assertNever(entry);
	}
};

const toNewEntry = (object: unknown): EntryWithoutId => {
	if (!object || typeof object !== 'object') {
		throw new Error('Parameters are missing/object is required');
	}

	if (
		'description' in object &&
		'date' in object &&
		'specialist' in object &&
		'gender' in object
	) {
		const typedObject = object as unknown as EntryTypeWithoutBase;
		const narrowedEntryPiece = entryTypeSelection(typedObject);

		if (!narrowedEntryPiece) {
			throw new Error('Invalid entry type');
		}

		const newEntry: EntryWithoutId = {
			...narrowedEntryPiece,
			description: parseString(object.description, 'description'),
			date: parseDate(object.date, 'date'),
			specialist: parseString(object.specialist, 'specialist'),
			diagnosisCodes: parseDiagnosisCodes(object),
		};
		return newEntry;
	}

	throw new Error('Required properties are missing');
};

export default toNewEntry;