import axios from 'axios';
import { useEffect, useState } from 'react'
import Contacts from './components/Contacts';
import ContactsForm from './components/ContactsForm';
import NameFilterer from './components/NameFilter';

const App = () => {
	//states
	const [persons, setPersons] = useState([]);
	const [filteredPersons, setFilteredPersons] = useState([]);
	const [newPerson, setNewPerson] = useState({
		name: '',
		number: ''
	});

	//get the response from the data header using axios and 
	//initialize both persons and filtered persons as its initial data
	useEffect(() => {
		axios.get('http://localhost:3001/persons').then(response => {
			const persons = response.data;
			setPersons(persons);
			setFilteredPersons(persons);
		});
	}, []);

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
		const personsUrl = 'http://localhost:3001/persons';
		const { name, number } = newPerson;
		addName(name);
		addNumber(number);
		axios.post(personsUrl, newPerson)
			.then(response => {
				setPersons(persons.concat(response.data));
			})
		setNewPerson({ ...newPerson, id: newPerson.length + 1 });
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
