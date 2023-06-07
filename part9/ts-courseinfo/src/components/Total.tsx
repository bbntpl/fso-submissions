interface TotalParams {
	exerciseCounts: number[]
}

const Total = (props: TotalParams) => {
	const { exerciseCounts } = props;

	const totalExercises = exerciseCounts.reduce((sum, count) => {
		return sum + count;
	}, 0);

	return (
		<p>
			Number of exercises{" "}
			{totalExercises}
		</p>
	)
}

export default Total;