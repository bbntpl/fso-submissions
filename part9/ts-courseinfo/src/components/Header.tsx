interface HeaderParams {
	courseName: string;
}

const Header = (props: HeaderParams) => {
	const { courseName } = props;

	return (
		<h1>{courseName}</h1>
	)
}

export default Header;