import Content from './components/Content';
import Header from './components/Header';
import Total from './components/Total';
import { courseParts } from './data/courses';

const App = () => {
	const courseName = "Half Stack application development";
	return (
		<div>
			<Header courseName={courseName} />
			<Content courseParts={courseParts} />
			<Total exerciseCounts={courseParts.map(c => c.exerciseCount)} />
		</div>
	);
};

export default App;