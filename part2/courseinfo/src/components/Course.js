import Header from './Header';
import Content from './Content';
import DisplayTotal from './DisplayTotal';

const Course = ({ course }) => {
	return (
		<div>
			<Header courseName={course.name} />
			<Content parts={course.parts} />
			<DisplayTotal parts={course.parts} />
		</div>
	)
}

export default Course;