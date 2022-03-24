const NameFilterer = ({ persons, setFilteredPersons }) => {
	const filterNameShown = (e) => {
		const filteredPersons = persons.filter(person => {
			//case friendly strings
			const name = person.name.toLowerCase();
			const enteredName = e.target.value.toLowerCase();
			return name.includes(enteredName);
		});
		setFilteredPersons(filteredPersons);
	}
	return (
		<div>
			filter name: <input onChange={filterNameShown} />
		</div>
	)
}

export default NameFilterer;