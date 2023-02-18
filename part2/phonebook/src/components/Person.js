const Person = ({ person, handleDelete }) => {
	const { name, number } = person;
	console.log(handleDelete);
	return (
		<p>{name} {number}
			<button onClick={() => handleDelete(person)} >delete</button>
		</p>
	);
}

export default Person;