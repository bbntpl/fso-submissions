import axios from 'axios';
import { Diagnosis } from '../types';

import { apiBaseUrl } from '../constants';

const getAll = async () => {
	const { data } = await axios.get<Diagnosis[]>(
		`${apiBaseUrl}/diagnoses`
	);

	return data;
}

const services = {
	getAll
}

export default services;