import express from 'express';
import { addPatient, getPatients } from '../services/patientService';
import { toNewPatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
	res.json(getPatients());
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

export default router;