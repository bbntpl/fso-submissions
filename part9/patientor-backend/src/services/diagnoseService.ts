import diagnoses from '../../data/diagnoses';
import { DiagnosisDetail } from '../types';

const getDiagnoses = (): DiagnosisDetail[] => {
	return diagnoses;
};

export {
	getDiagnoses
};