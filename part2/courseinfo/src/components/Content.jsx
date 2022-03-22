import Part from './Part';

const Content = (props) => {
	return (props.parts.map((v, index) =>
		<Part name={v.name} exercises={v.exercises} key={index} />
	));
}

export default Content;