const Person = ({ person, handleDelete }) => {
	const { name, number } = person;
	return (
		<p>{name} {number}
			<button onClick={() => handleDelete(person)} >delete</button>
		</p>
	);
}

export default Person;