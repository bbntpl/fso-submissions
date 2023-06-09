import { v4 as uuidv4 } from 'uuid';

import patients from '../../data/patients';
import { NewPatient, Patient, PatientBasicInfo, Entry, EntryWithoutId } from '../types';

const getPatients = (): PatientBasicInfo[] => {
	return patients.map(patient => ({
		id: patient.id,
		name: patient.name,
		dateOfBirth: patient.dateOfBirth,
		gender: patient.gender,
		occupation: patient.occupation,
		entries: patient.entries
	}));
};

const getPatient = (id: string): Patient | undefined => {
	return patients.find(p => p.id === id) || undefined;
};

const addPatient = (newPatient: NewPatient): Patient => {
	const patient = {
		id: uuidv4(),
		...newPatient
	};

	patients.push(patient);
	return patient;
};

interface AddPatientParams {
	patientId: string;
	newEntry: EntryWithoutId;
}

const addPatientEntry = ({ patientId, newEntry }: AddPatientParams) => {

	const entry: Entry = {
		id: uuidv4(),
		...newEntry
	};

	patients.map((patient) => {
		if(patient.id !== patientId) return patient;
		if (
			Object.prototype.hasOwnProperty.call(patient, 'entries')) {
			patient.entries?.unshift(entry);
		} else {
			patient.entries = [entry];
		}
		return patient;
	});

	return entry;
};

export {
	getPatients,
	getPatient,
	addPatient,
	addPatientEntry
};