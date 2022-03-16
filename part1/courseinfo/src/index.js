import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => <h1>{props.course}</h1>

const Part = (props) => {
	const { part, exercise } = props;
	return (<p>{part} {exercise}</p>);
}

const Content = (props) => {
	return (props.contents.map((v, index) =>
		<Part part={v.part} exercise={v.exercise} key={index} />
	));
}

const Total = (props) => {
	const { contents } = props;
	const totalExercises = contents
		.map(content => content.exercise)
		.reduce((sum, prev) => sum + prev, 0);
	return (<p> Number of exercises {totalExercises}</p>)
}

const App = () => {
	const course = 'Half Stack application development';
	const contents = [
		{
			part: 'Fundamentals of React',
			exercise: 10
		},
		{
			part: 'Using props to pass data',
			exercise: 7
		},
		{
			part: 'State of a component',
			exercise: 14
		}
	];

	return (
		<div>
			<Header course={course} />
			<Content contents={contents} />
			<Total contents={contents} />
		</div>
	)
}

ReactDOM.render(<App />, document.getElementById('root'))