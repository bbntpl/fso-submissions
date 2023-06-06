import { v4 as uuidv4 } from 'uuid';

import patients from '../../data/patients';
import { NewPatient, Patient, PatientBasicInfo } from '../types';

const getPatients = (): PatientBasicInfo[] => {
	return patients.map(patient => ({
		id: patient.id,
		name: patient.name,
		dateOfBirth: patient.dateOfBirth,
		gender: patient.gender,
		occupation: patient.occupation
	}));
};

const addPatient = (newPatient: NewPatient): Patient => {
	const patient = {
		id: uuidv4(),
		...newPatient
	};

	patients.push(patient);
	return patient;
};

export {
	getPatients,
	addPatient
};