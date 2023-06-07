import { DiaryEntry as DiaryEntryType } from '../types';
import DiaryEntry from './DiaryEntry';

interface DiaryCollectionParams {
	diaries: DiaryEntryType[]
}

const DiaryCollection = ({ diaries }: DiaryCollectionParams) => {
	return <div>
		<h2>Diary entries</h2>
		{
			diaries.map(d => {
				return <DiaryEntry key={d.id} entry={d} />
			})
		}

	</div>
}

export default DiaryCollection;