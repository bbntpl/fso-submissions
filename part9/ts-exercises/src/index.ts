import express from 'express';
import path from 'path';
import { bmiCalculator } from '../bmiCalculator';
import { calculator, Operation } from '../calculator';
import { exerciseCalculator } from '../exerciseCalculator';
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: true })); 

app.get('/ping', (_req, res) => {
	res.send('pong');
});


app.get('/hello', (_req, res) => {
	res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
	try {
		const { height, weight } = req.query;
		const bmi = bmiCalculator(Number(height), Number(weight));

		res.status(201).json({
			height,
			weight,
			bmi
		});

	} catch {
		res.status(400).json({
			error: 'malformatted parameters'
		});
	}
});

app.post('/calculate', (req, res) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const { value1, value2, op } = req.body;

	if (!value1 || isNaN(Number(value1))) {
		return res.status(400).send({ error: '...' });
	}

	// assert the type
	const operation = op as Operation;

	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	const result = calculator(Number(value1), Number(value2), operation);
	return res.send({ result });
});

type ExercisesBody = {
	days: string;
	target: number;
};

app.get('/exercises', (_req, res) => {
	res.sendFile(path.join(__dirname, '../public', 'exercises.html'));
});

app.post('/exercises', (req, res) => {
	const { days, target } = req.body as ExercisesBody;
	const parsedDays = days.split(',').map(Number);
	console.log(req.body);
	try {
		const result = exerciseCalculator(parsedDays, Number(target));
		res.json(result);
	} catch (error: unknown) {
		if (error instanceof Error) {
			res.status(400).send({ error: error.message });
		} else {
			res.status(500).send({ error: 'Something went wrong' });
		}
	}
});

const PORT = 3003;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});