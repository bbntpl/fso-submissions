import { CoursePart } from '../types';
import Part from './Part';

interface ContentParams {
	courseParts: CoursePart[];
}

const Content = (props: ContentParams) => {
	const { courseParts } = props;

	return <>
			{
				courseParts.map((part, index) => (
					<Part
						key={`${part.name}-${index}`}
						part={part}
					/>
				))
			}
	</>
}

export default Content;