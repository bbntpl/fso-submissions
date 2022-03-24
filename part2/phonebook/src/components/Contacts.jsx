import PersonDetails from './PersonDetails';

const Contacts = ({ persons }) => {
	return (
		<div>
			{
				persons.map(person => <PersonDetails  key={person.id} person={person} />)
			}
		</div>
	)
}

export default Contacts;