import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';

import { Entry, Patient } from '../../types';
import patientService from '../../services/patients';
import Entries from './Entries';
import AddEntryForm from '../AddEntryForm';

export default function PatientInfo() {
	const { id } = useParams();
	const [toggleEntryForm, setToggleEntryForm] = useState<boolean>(false);
	const [patient, setPatient] = useState<Patient | undefined>();

	useEffect(() => {
		patientService.getPatient(id).then(data => {
			setPatient(data);
		})
	}, [id])

	if (!patient) {
		return <p>...loading</p>
	}

	const addEntry = (entry: Entry) => {
		setPatient((prevValues) => {
			if (prevValues) {
				return {
					...prevValues,
					entries: [entry, ...(prevValues.entries || [])]
				};
			}

			// if undefined, prevent entry concatenatoin
			return prevValues;
		});
	}

	return (
		<div>
			<h1>{patient.name}</h1>
			<p>Date of birth: {patient.dateOfBirth}</p>
			<p>Gender: {patient.gender}</p>
			<p>SSN: {patient.ssn}</p>
			<p>Occupation: {patient.occupation}</p>
			<Button
				variant='contained'
				color='primary'
				onClick={() => setToggleEntryForm(prevBoolean => !prevBoolean)}
			>
				{toggleEntryForm ? 'Hide entry form' : 'Add entry'}
			</Button>
			{toggleEntryForm && <AddEntryForm patientId={patient.id} addEntry={addEntry} />}
			{patient.entries ?
				<Entries entries={patient.entries} />
				: null}
		</div>
	)
}