import Person from './Person';

const Persons = ({ persons, filterKeyword, handleDelete }) => {
	return (
		<div>
			{
				persons
				.filter(person => person.name.toUpperCase().includes(filterKeyword.toUpperCase()))
				.map((person, i) => {
						return <Person key={i} person={person} handleDelete={handleDelete}/>
				})
			}
		</div>
	)

}

export default Persons;