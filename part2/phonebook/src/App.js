import { useState } from 'react'
import Contacts from './components/Contacts';
import ContactsForm from './components/ContactsForm';

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas' }
	]);
	const [newName, setNewName] = useState('');

	function addName(e) {
		e.preventDefault();
		const newPerson = {
			name: newName
		};
		if (persons.filter(person => person.name === newName).length) {
			alertIfNameAlreadyExists();
		} else {
			setPersons(persons.concat(newPerson));
			setNewName('');
			e.target.value = '';
		}
	}


	function alertIfNameAlreadyExists() {
		alert(`${newName} is already added to phonebook`);
	}

	return (
		<div>
			<h2>Phonebook</h2>
			<ContactsForm addName={addName} setNewName={setNewName} newName={newName} />
			<h2>Numbers</h2>
			<Contacts persons={persons} />
		</div>
	)
};

export default App;
