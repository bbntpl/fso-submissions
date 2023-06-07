import axios from 'axios';
import { DiaryEntry, NewDiaryEntry } from '../types';

const baseURL = 'http://localhost:3001/api/diaries';

export const fetchDiaries = async (): Promise<DiaryEntry[]> => {
	try {
		const response = await axios.get<DiaryEntry[]>(baseURL);

		return response.data;
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.log(`Error: ${error.message} during diaries fetch`);
		}
		throw error;
	}
}

export const createDiaryEntry = async (newDiary: NewDiaryEntry): Promise<DiaryEntry> => {
	try {
		const response = await axios.post<DiaryEntry>(baseURL, newDiary);
		return response.data;
	} catch (error: unknown) {
		if (error instanceof Error) {
			throw new Error(`Error: ${error.message} during diary creation`);
		}
		throw error;
	}
}
