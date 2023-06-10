import { Diagnosis, OccupationalHealthcareEntry as OccupationalHealthcareEntryType } from '../../../types';
import { entryStyle } from './styles';

interface OccupationalHealthcareEntryParams {
	entry: OccupationalHealthcareEntryType;
	diagnoses: Diagnosis[];
}

export default function OccupationalHealthcareEntry(props: OccupationalHealthcareEntryParams) {
	const { entry, diagnoses } = props;
	const {
		diagnosisCodes,
		date,
		type,
		description,
		employerName,
		sickLeave
	} = entry;

	return <div style={entryStyle}>
		<span>{date} ({type} {employerName && `- ${employerName}`})</span>
		<p><i>{description}</i></p>
		{sickLeave && <p>Sick Leave: {sickLeave.startDate}-{sickLeave.endDate}</p>}
		<ul>
			{diagnosisCodes && diagnosisCodes.map(code => {
				const diagnosisInfo = diagnoses.find(d => d.code === code);
				return <li key={code}>{code} {diagnosisInfo && diagnosisInfo.name}</li>
			})}
		</ul>
		<p>Diagnosed by {entry.specialist}</p>
	</div>
}