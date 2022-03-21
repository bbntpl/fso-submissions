import { useState } from 'react';

const totalFeedbacks = ({good, neutral, bad}) => good + neutral + bad;

//app components
const FeedbackStat = ({ name, count }) => <p>{`${name} ${count}`}</p>

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
				incrementNum={() => setFeedbackOpts({ ...feedbackOpts, neutral: feedbackOpts.good + 1 })}
				feedbackOptName={'neutral'}
			/>
			<FeedbackBtn
				incrementNum={() => setFeedbackOpts({ ...feedbackOpts, good: feedbackOpts.good + 1 })}
				feedbackOptName={'bad'}
			/>
		</div>
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
			<h1>give feedback</h1>
			<FeedbackBtns feedbackOpts={feedbackOpts} setFeedbackOpts={setFeedbackOpts} />
			<h1>statistics</h1>
			<div>
				<FeedbackStat name={'good'} count={feedbackOpts.good} />
				<FeedbackStat name={'neutral'} count={feedbackOpts.neutral} />
				<FeedbackStat name={'bad'} count={feedbackOpts.bad} />
				<FeedbackStat name={'all'} count={totalFeedbacks(feedbackOpts)} />
			</div>
		</div>
	);
}

export default App;