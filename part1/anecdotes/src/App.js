import { useState } from 'react'
import './App.css';

const randomNum = (max) => Math.floor(Math.random() * max) + 1;
const incrementVotes = (params) => {
	const { setAnecdotes, selected } = params;

	setAnecdotes(anecdotes => {
		//updating some parts of the object through a copy
		return anecdotes.map((item, i) => {
			//update the chosen prop of the object
			return i === selected ? { ...item, votes: item.votes + 1 } : item;
		});
	});
};
const getIndexOfHighestVotes = (anecdotes) => {
	const votes = anecdotes.map(o => o.votes);

	//get the value of the highest votes among the anecdotes
	const maxVotes = Math.max.apply(Math, votes);

	//get the index of the higheset votes
	return votes.indexOf(maxVotes);
};

//components
const Buttons = ({ setSelected, setAnecdotes, selected, anecdotes }) => {
	return (
		<div>
			<button onClick={() => incrementVotes({ setAnecdotes, selected })}>vote</button>
			<button onClick={() => setSelected(randomNum(anecdotes.length - 1))}>next anecdote</button>
		</div>
	)
}

const Block = ({ text }) => <p className="block-header">{text}</p>

const DisplayAnecdote = ({ anecdotes, selected }) => {
	console.log(anecdotes, selected);
	return (
		<div>
			<p>{anecdotes[selected].anecdote}</p>
			<p>has {anecdotes[selected].votes ? anecdotes[selected].votes : 'no'} votes</p>
		</div>
	)
}

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
	return (
		<div>
			<div>
				<Block text="Anecdote of the day" />
				<DisplayAnecdote anecdotes={anecdotes} selected={selected} />
			</div>
			<Buttons setSelected={setSelected} setAnecdotes={setAnecdotes} selected={selected} anecdotes={anecdotes} />
			<div>
				<Block text="Anecdote with the most votes" />
				<DisplayAnecdote anecdotes={anecdotes} selected={getIndexOfHighestVotes(anecdotes)} />
			</div>
		</div>
	)
};

export default App;