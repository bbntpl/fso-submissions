import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => <h1>{props.courseName}</h1>

const Part = (props) => {
	const { name, exercises } = props;
	return (<p>{name} {exercises}</p>)
}

const Content = (props) => {
	return (props.parts.map((v, index) =>
		<Part name={v.name} exercises={v.exercises} key={index} />
	));
}

const Total = (props) => {
	const { parts } = props;
	const totalExercises = parts
		.map(content => content.exercises)
		.reduce((sum, prev) => sum + prev, 0);

	return (<p> Number of exercises {totalExercises}</p>)
}

const App = () => {
	const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
	return (
		<div>
			<Header courseName={course.name} />
			<Content parts={course.parts} />
			<Total parts={course.parts} />
		</div>
	)
}

ReactDOM.render(<App />, document.getElementById('root'))