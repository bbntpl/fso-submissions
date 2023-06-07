import { useState } from 'react';
import {
	DiaryEntry,
	NewDiaryEntry,
	NotificationObject,
	Visibility,
	Weather
} from '../types';
import Notification from './Notification';
import { createDiaryEntry } from '../services/diaryService';

interface DiaryEntryFormParams {
	addDiary: (newEntry: DiaryEntry) => void;
}

const weatherOptions = Object.values(Weather);
const visibilityOptions = Object.values(Visibility);

const DiaryEntryForm = ({ addDiary }: DiaryEntryFormParams) => {
	const [notifObject, setNotifObject] = useState<NotificationObject | undefined>()
	const [newDiary, setNewDiary] = useState<NewDiaryEntry>({
		date: '',
		visibility: Visibility.Great,
		weather: Weather.Sunny,
		comment: ''
	});

	const notify = ({ message, type }: NotificationObject) => {
		setNotifObject({ message, type });
		setTimeout(() => {
			setNotifObject(undefined);
		}, 5000)
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		setNewDiary({
			...newDiary,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (event: React.SyntheticEvent) => {
		event.preventDefault();
		try {
			const diaryEntry = await createDiaryEntry(newDiary);
			addDiary(diaryEntry);
			const successMsg = `Successfully added diary entry ${newDiary.date}`;
			notify({ message: successMsg, type: 'success' })
		} catch (error) {
			if (error instanceof Error) {
				notify({ message: error.message, type: 'error' });
			}
		}

	}

	return (
		<div>
			<h2>Add new entry</h2>
			{notifObject && <Notification notifObject={notifObject} />}
			<form onSubmit={handleSubmit}>
				<div>
					<label>
						Date:
					</label>
					<input type="date" name="date" value={newDiary.date} onChange={handleChange} />
				</div>
				<div>
					<label>
						Weather:
					</label>
					<select name="weather" value={newDiary.weather} onChange={handleChange}>
						{weatherOptions.map((option) => (
							<option key={option} value={option}>{option}</option>
						))}
					</select>
				</div>
				<div>
					<label>
						Visibility:
					</label>
					<select name="visibility" value={newDiary.visibility} onChange={handleChange}>
						{visibilityOptions.map((option) => (
							<option key={option} value={option}>{option}</option>
						))}
					</select>
				</div>
				<div>
				<label>
					Comment:
					<input type="text" name="comment" value={newDiary.comment} onChange={handleChange} />
				</label>
				</div>
				<button type="submit">Submit</button>
			</form>
		</div>
	)
}

export default DiaryEntryForm;