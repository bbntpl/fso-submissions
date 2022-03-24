import { useState } from 'react'
import Contacts from './components/Contacts';
import ContactsForm from './components/ContactsForm';
import NameFilterer from './components/NameFilter';

const App = () => {
	//states
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-123456', id: 1 },
		{ name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
		{ name: 'Dan Abramov', number: '12-43-234345', id: 3 },
		{ name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
	]);
	const [filteredPersons, setFilteredPersons] = useState(persons);
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

	function addPerson(newPerson, persons) {
		const { name, number } = newPerson;
		addName(name);
		addNumber(number);
		setNewPerson({ ...newPerson, id: newPerson.length + 1 });
		setPersons(persons.concat(newPerson));
		setFilteredPersons(persons.concat(newPerson));
		clearInputs();
	}

	function clearInputs() {
		setNewPerson({ ...newPerson, name: '', number: '' });
	}

	function alertIfNameAlreadyExists() {
		alert(`${newPerson.name} is already added to phonebook`);
	}

	const isNameExists = () => persons.filter(person => person.name === newPerson.name).length;

	function submitForm(e) {
		e.preventDefault();
		if (!newPerson.name.length) return;
		if (isNameExists()) {
			alertIfNameAlreadyExists();
		} else {
			addPerson(newPerson, persons);
		}
	}


	return (
		<div>
			<h2>Phonebook</h2>
			<NameFilterer persons={persons} setFilteredPersons={setFilteredPersons} />
			<h2>add a new</h2>
			<ContactsForm submitForm={submitForm} setNewPerson={setNewPerson} newPerson={newPerson} />
			<h2>Numbers</h2>
			<Contacts persons={filteredPersons} />
		</div>
	)
};

export default App;
