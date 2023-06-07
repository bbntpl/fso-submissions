import { DiaryEntry as DiaryEntryType } from '../types';

interface DiaryEntryParams {
	entry: DiaryEntryType
}

const DiaryEntry = ({ entry }: DiaryEntryParams) => {
	return <div>
		<h4>{entry.date}</h4>

		<p>visibility: {entry.visibility}</p>
		<p>weather: {entry.weather}</p>
	</div>
}

export default DiaryEntry