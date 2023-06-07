import { useEffect, useState } from 'react';
import './App.css';
import { DiaryEntry } from './types';
import { fetchDiaries } from './services/diaryService';
import DiaryCollection from './components/DiaryCollection';
import DiaryEntryForm from './components/DiaryEntryForm';

function App() {
	const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

	useEffect(() => {
		fetchDiaries().then(data => {
			setDiaries(data);
		});
	}, [])

	const addDiary = (newDiary: DiaryEntry) => {
		setDiaries(prevDiaries => prevDiaries
			? [...prevDiaries, newDiary]
			: [newDiary]);
	}

	return (
		<div>
			<DiaryEntryForm addDiary={addDiary} />
			<DiaryCollection diaries={diaries} />
		</div>
	);
}

export default App;
