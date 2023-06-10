import express from 'express';
import { addPatient, addPatientEntry, getPatient, getPatients } from '../services/patientService';
import toNewPatient from '../utils/toNewPatient';
import toNewEntry from '../utils/toNewEntry';

const router = express.Router();

router.get('/', (_req, res) => {
	try {
		const fetchedPatient = res.json(getPatients());
		res.json(fetchedPatient);
	} catch (error: unknown) {
		if (error instanceof Error) {
			throw new Error(error.message);
		}

		throw error;
	}
});

router.get('/:id', (req, res) => {
	const id = req.params.id;
	try {
		const fetchedPatient = getPatient(id);
		res.json(fetchedPatient);
	} catch (error: unknown) {
		if (error instanceof Error) {
			throw new Error(error.message);
		}

		throw error;
	}
});

router.post('/', (req, res) => {
	try {
		const patient = addPatient(toNewPatient(req.body));
		res.status(201).json(patient);
	} catch (error) {
		let errorMessage = 'Something went wrong';
		if (error instanceof Error) {
			errorMessage += ' Error: ' + error.message;
		}
		res.status(400).send(errorMessage);
	}
	res.json(getPatients());
});


router.post('/:id/entries', (req, res) => {
	try {
		const { id } = req.params;
		const entry = addPatientEntry({
			patientId: id,
			newEntry: toNewEntry(req.body)
		});
		res.status(201).json(entry);
	} catch (error) {
		let errorMessage = 'Something went wrong';
		if (error instanceof Error) {
			errorMessage += ' Error: ' + error.message;
		}
		res.status(400).send(errorMessage);
	}
});

export default router;