import { useState } from 'react';
import './App.css';

const totalFeedbacks = ({ good, neutral, bad }) => good + neutral + bad;
const averageFeedback = (feedbackOpts) => {
	const { good, bad } = feedbackOpts;
	const averageScore = good - bad;
	return (averageScore / totalFeedbacks(feedbackOpts));
}
const positiveFeedbackPerc = (feedbackOpts) => {
	return (`${(feedbackOpts.good / totalFeedbacks(feedbackOpts)) * 100} %`);
}

//app components
const Block = ({ headerName }) => <h1 className={'block-header'}>{headerName}</h1>

const StatisticLine = ({ text, value }) => {
	return (
		<tr className="stat-line">
			<th>{text}</th>
			<th>{value}</th>
		</tr>
	)
}


const FeedbackBtn = ({ incrementNum, feedbackOptName }) =>
	<button onClick={incrementNum}>{feedbackOptName}</button>

const FeedbackBtns = ({ feedbackOpts, setFeedbackOpts }) => {
	return (
		<div>
			<FeedbackBtn
				incrementNum={() => setFeedbackOpts({ ...feedbackOpts, good: feedbackOpts.good + 1 })}
				feedbackOptName={'good'}
			/>
			<FeedbackBtn
				incrementNum={() => setFeedbackOpts({ ...feedbackOpts, neutral: feedbackOpts.neutral + 1 })}
				feedbackOptName={'neutral'}
			/>
			<FeedbackBtn
				incrementNum={() => setFeedbackOpts({ ...feedbackOpts, bad: feedbackOpts.bad + 1 })}
				feedbackOptName={'bad'}
			/>
		</div>
	)
}

const Statistics = ({ feedbackOpts }) => {
	if (!totalFeedbacks(feedbackOpts)) {
		return (<p>No feedback given</p>);
	}
	return (
		<table>
			<tbody>
				<StatisticLine text='good' value={feedbackOpts.good} />
				<StatisticLine text='neutral' value={feedbackOpts.neutral} />
				<StatisticLine text='bad' value={feedbackOpts.bad} />
				<StatisticLine text='all' value={totalFeedbacks(feedbackOpts)} />
				<StatisticLine text='average' value={averageFeedback(feedbackOpts)} />
				<StatisticLine text='positive' value={positiveFeedbackPerc(feedbackOpts)} />
			</tbody>
		</table>
	)
}

const App = () => {
	// save clicks of each button to its own state
	const [feedbackOpts, setFeedbackOpts] = useState({
		good: 0,
		neutral: 0,
		bad: 0
	})

	return (
		<div>
			<div>
				<Block headerName={'give feedback'} />
				<FeedbackBtns feedbackOpts={feedbackOpts} setFeedbackOpts={setFeedbackOpts} />
			</div>
			<div>
				<Block headerName={'statistics'} />
				<Statistics feedbackOpts={feedbackOpts} />
			</div>
		</div>
	);
}

export default App;