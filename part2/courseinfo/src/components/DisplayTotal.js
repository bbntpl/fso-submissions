const DisplayTotal = ({ parts }) => {
	const totalExercises = parts
		.map(content => content.exercises)
		.reduce((sum, prev) => sum + prev, 0);

	return (<p><b>total of {totalExercises} exercises</b></p>)
}

export default DisplayTotal;