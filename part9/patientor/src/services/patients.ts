import axios from "axios";
import { Entry, EntryWithoutId, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
	const { data } = await axios.get<Patient[]>(
		`${apiBaseUrl}/patients`
	);

	return data;
};


const getPatient = async (id: string | undefined) => {
	const { data } = await axios.get<Patient>(
		`${apiBaseUrl}/patients/${id}`
	);

	return data;
};

interface CreateEntryParams {
	patientId: string;
	newEntry: EntryWithoutId;
}

const createEntry = async ({ patientId, newEntry }: CreateEntryParams) => {
	try {
		const { data } = await axios.post<Entry>(
			`${apiBaseUrl}/patients/${patientId}/entries`,
			newEntry
		)

		return data;
	} catch (err: unknown) {
		if (axios.isAxiosError(err)) {
			// error response from server
			console.log(err.response?.data);
		} else if (err instanceof Error) {
			// other error like network error
			console.log(err.message);
		}

		throw err;
	}
}

const create = async (object: PatientFormValues) => {
	const { data } = await axios.post<Patient>(
		`${apiBaseUrl}/patients`,
		object
	);

	return data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	getAll,
	getPatient,
	create,
	createEntry
};

