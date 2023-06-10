import { Diagnosis, HealthCheckEntry as HealthCheckEntryType } from '../../../types';
import { entryStyle } from './styles';

interface HealthCheckEntryParams {
	entry: HealthCheckEntryType;
	diagnoses: Diagnosis[];
}

export default function HealthCheckEntry(props: HealthCheckEntryParams) {
	const { diagnoses } = props;
	const { healthCheckRating, date, type, description, diagnosisCodes } = props.entry;

	return <div style={entryStyle}>
		<span>{date} ({type})</span>
		<p><i>{description}</i></p>
		Health Rating {healthCheckRating + 1} out of 4
		<ul>
			{diagnosisCodes && diagnosisCodes.map(code => {
				const diagnosisInfo = diagnoses.find(d => d.code === code);
				return <li key={code}>{code} {diagnosisInfo && diagnosisInfo.name}</li>
			})}
		</ul>
		<p>Diagnosed by {props.entry.specialist}</p>
	</div>
}