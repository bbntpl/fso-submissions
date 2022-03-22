import '../app.css';

const Total = ({ parts }) => {
	return (
		<p className="total-exercises">
			total of {parts.reduce((sum, obj) => sum += obj.exercises, 0)}	exercises
		</p>
	)
}

export default Total;