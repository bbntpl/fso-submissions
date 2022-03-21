import { useState } from 'react'
import './App.css';

const App = () => {
	const [anecdotes, setAnecdotes] = useState([
		{
			anecdote: 'If it hurts, do it more often',
			votes: 0,
		},
		{
			anecdote: 'Adding manpower to a late software project makes it later!',
			votes: 0,
		},
		{
			anecdote: 'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
			votes: 0,
		},
		{
			anecdote: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
			votes: 0,
		},
		{
			anecdote: 'Premature optimization is the root of all evil.',
			votes: 0,
		},
		{
			anecdote: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
			votes: 0,
		},
		{
			anecdote: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients',
			votes: 0,
		}
	]);
	
	const [selected, setSelected] = useState(0);

	const randomNum = (max) => Math.floor(Math.random() * max) + 1;
	const incrementVotes = () => {
		setAnecdotes(anecdotes => {
			return anecdotes.map((item, i) => {
				return i === selected ? { ...item, votes: item.votes + 1 } : item;
			});
		});
	};

	return (
		<div>
			<p>{anecdotes[selected].anecdote}</p>
			<p>has {anecdotes[selected].votes ? anecdotes[selected].votes : 'no'} votes</p>
			<div>
				<button onClick={() => incrementVotes()}>vote</button>
				<button onClick={() => setSelected(randomNum(anecdotes.length - 1))}>next anecdote</button>
			</div>
		</div>
	)
};

export default App;