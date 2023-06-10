import { useEffect, useState } from 'react';

import diagnosesServices from '../../../services/diagnoses';
import { Diagnosis, Entry as EntryType } from '../../../types';
import HospitalEntry from './HospitalEntry';
import OccupationalHealthcareEntry from './OccupationalHealthcareEntry';
import HealthCheckEntry from './HealthCheckEntry';

interface EntriesParams { entries: EntryType[] }

export interface EntryParams {
	entry: EntryType;
	diagnoses: Diagnosis[];
}

export default function Entries({ entries }: EntriesParams) {
	const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([])

	useEffect(() => {
		diagnosesServices.getAll().then(data => setDiagnoses(data));
	}, [])


	const assertNever = (value: never): never => {
		throw new Error(
			`Unhandled discriminated union member: ${JSON.stringify(value)}`
		);
	};

	const EntryDetails: React.FC<EntryParams> = ({ entry, diagnoses}) => {
		switch (entry.type) {
			case 'Hospital':
				return <HospitalEntry entry={entry} diagnoses={diagnoses} />
			case 'OccupationalHealthcare':
				return <OccupationalHealthcareEntry entry={entry} diagnoses={diagnoses}/>
			case 'HealthCheck':
				return <HealthCheckEntry entry={entry} diagnoses={diagnoses}/>
			default:
				return assertNever(entry);
		}
	}

	return <>
		<h2>entries</h2>
		{
			entries.map(entry => {
				return <EntryDetails
					key={entry.id}
					entry={entry}
					diagnoses={diagnoses}
				/>

			})
		}
	</>
}