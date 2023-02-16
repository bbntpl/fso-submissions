import { useState } from 'react'

const Button = ({ handleClick, text }) => {
	return (
		<button onClick={handleClick}>{text}</button>
	)
}

// Display a line of a statistic
const StatisticLine = ({ text, value }) => (
	<tr>
		<td>{text}</td>
		<td>{value}</td>
	</tr>
)

// Display the statistics section
const Statistics = ({ feedbacks }) => {
	const {
		good,
		neutral,
		bad
	} = feedbacks;

	const sumOfArrEls = (feedbacks) => {
		const add = (a, b) => a += b;
		return feedbacks.reduce(add);
	}

	const total = sumOfArrEls([good, neutral, bad]);

	const averageScore = (good - bad) / total || 0;

	const positiveScore = ((good / total) * 100) || 0;

	return (
		<div>
			<h1>statistics</h1>
			{total ?
				<table>
					<StatisticLine text='good' value={good} />
					<StatisticLine text='neutral' value={neutral} />
					<StatisticLine text='bad' value={bad} />
					<StatisticLine text='all' value={total} />
					<StatisticLine text='average' value={`${averageScore} %`} />
					<StatisticLine text='positive' value={`${positiveScore} %`} />
				</table>
				:
				<p>No feedback given</p>
			}
		</div>
	)
}


const App = () => {
	// save clicks of each button to its own state
	const [feedbacks, setFeedbacks] = useState({
		good: 0,
		neutral: 0,
		bad: 0,
	});

	const incrementFeedback = (type) => {
		setFeedbacks(feedbacks => ({
			...feedbacks,
			[type]: feedbacks[type] + 1,
		}));
	}

	return (
		<div>
			<div>
				<h1>give feedback</h1>
				<Button handleClick={() => incrementFeedback('good')} text='good' />
				<Button handleClick={() => incrementFeedback('neutral')} text='neutral' />
				<Button handleClick={() => incrementFeedback('bad')} text='bad' />
			</div>
			<Statistics feedbacks={feedbacks} />
		</div>
	)
}

export default App;