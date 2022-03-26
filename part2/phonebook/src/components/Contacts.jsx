import PersonDetails from './PersonDetails';

const Contacts = ({ persons, deletePerson }) => {
	return (
		<div>
			{
				persons.map(person => {
					const { id, name } = person;
					return (
						<div key={id}>
							<PersonDetails person={person} />
							<button onClick={() => deletePerson(id, name)}>delete</button>
						</div>)
				})
			}
		</div>
	)
}

export default Contacts;