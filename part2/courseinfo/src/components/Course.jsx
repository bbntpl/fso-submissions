import Header from './Header';
import Content from './Content';

const Course = ({ course }) => {
	return (
		<div>
			<Header courseName={course.name} />
			<Content parts={course.parts} />
		</div>
	)
}

export default Course;