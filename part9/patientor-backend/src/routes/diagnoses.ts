import express from 'express';
import { getDiagnoses } from '../services/diagnoseService';

const router = express.Router();

router.get('/', (_req, res) => {
	res.json(getDiagnoses());
});

export default router;

