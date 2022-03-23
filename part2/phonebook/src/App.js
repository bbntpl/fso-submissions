import { useState } from 'react'
import Contacts from './components/Contacts';
import ContactsForm from './components/ContactsForm';

const App = () => {
	//states
	const [persons, setPersons] = useState([
		{
			name: 'Arto Hellas',
			number: '0129319'
	}
	]);

	const [newPerson, setNewPerson] = useState({
		name: '',
		number: ''
	});

	function addName(name) {
		if (!name) return;
		setNewPerson({ ...newPerson, name: name });
	}

	function addNumber(number) {
		if (!number) return;
		//converting a phone/tel number to a text
		setNewPerson({ ...newPerson, number: number + '' });
	}

	function clearInputs() {
		setNewPerson({ ...newPerson, name: '', number: '' })
	}

	function submitForm(e) {
		e.preventDefault();
		const { name, number } = newPerson;
		if (persons.filter(person => person.name === newPerson.name).length) {
			alertIfNameAlreadyExists();
		} else {
			addName(name);
			addNumber(number);
			setPersons(persons.concat(newPerson));
			clearInputs();
		}
	}

	function alertIfNameAlreadyExists() {
		alert(`${newPerson.name} is already added to phonebook`);
	}

	return (
		<div>
			<h2>Phonebook</h2>
			<ContactsForm submitForm={submitForm} setNewPerson={setNewPerson} newPerson={newPerson} />
			<h2>Numbers</h2>
			<Contacts persons={persons} />
		</div>
	)
};

export default App;
