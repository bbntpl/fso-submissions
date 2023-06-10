import { Diagnosis, HospitalEntry as HospitalEntryType } from '../../../types';
import { entryStyle } from './styles';

interface HospitalEntryParams {
	entry: HospitalEntryType;
	diagnoses: Diagnosis[]
}

export default function HospitalEntry(props: HospitalEntryParams) {
	const { diagnoses } = props;
	const { discharge, date, type, description, diagnosisCodes } = props.entry;

	return <div style={entryStyle}>
		<span>{date} ({type})</span>
		<p><i>{description}</i></p>
		<dl>
			<dt>{discharge.date}</dt>
			<dd>{discharge.criteria}</dd>
		</dl>
		<ul>
			{diagnosisCodes && diagnosisCodes.map(code => {
				const diagnosisInfo = diagnoses.find(d => d.code === code);
				return <li key={code}>{code} {diagnosisInfo && diagnosisInfo.name}</li>
			})}
		</ul>
		<p>Diagnosed by {props.entry.specialist}</p>
	</div>
}