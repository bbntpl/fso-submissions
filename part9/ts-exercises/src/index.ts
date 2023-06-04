// const express = require('express');

import express from 'express';
import { bmiCalculator } from '../bmiCalculator';
import { calculator } from '../calculator';
const app = express();

app.use(express.json());

app.get('/ping', (_req, res) => {
	res.send('pong');
});


app.get('/hello', (_req, res) => {
	res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
	try {
		const { height, weight } = req.query;
		console.log(height, weight)
		const bmi = bmiCalculator(Number(height), Number(weight));

		res.status(201).json({
			height,
			weight,
			bmi
		})

	} catch {
		res.status(400).json({
			error: 'malformatted parameters'
		})
	}
});

app.post('/calculate', (req, res) => {
  const { value1, value2, op } = req.body;

  const result = calculator(value1, value2, op);
  res.send({ result });
});

const PORT = 3003;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});