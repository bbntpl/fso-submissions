import { useState } from 'react';


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
	return (
		<>
			<FeedbackStat name={'good'} count={feedbackOpts.good} />
			<FeedbackStat name={'neutral'} count={feedbackOpts.neutral} />
			<FeedbackStat name={'bad'} count={feedbackOpts.bad} />
			<FeedbackStat name={'all'} count={totalFeedbacks(feedbackOpts)} />
			<FeedbackStat name={'average'} count={averageFeedback(feedbackOpts)} />
			<FeedbackStat name={'positive'} count={positiveFeedbackPerc(feedbackOpts)} />
		</>
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