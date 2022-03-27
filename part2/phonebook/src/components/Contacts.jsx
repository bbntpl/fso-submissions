import PersonDetails from './PersonDetails';
const displayEmptyPhonebook = () => {
	return (
		<p>You don't have any person on your contact list.</p>
	)
}
const displayPhonebook = (persons, deletePerson) => {
	return persons.map(person => {
		const { id, name } = person;
		return (
			<div key={id}>
				<PersonDetails person={person} />
				<button onClick={() => deletePerson(id, name)}>delete</button>
			</div>)
	})
}

const Contacts = ({ persons, deletePerson }) => {
	return (
		<div>
			{
			!persons.length ? displayEmptyPhonebook()
			: displayPhonebook(persons, deletePerson)
			}
		</div>
	)
}

export default Contacts;