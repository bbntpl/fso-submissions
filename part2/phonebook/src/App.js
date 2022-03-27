import { useEffect, useState } from 'react'

//components
import Contacts from './components/Contacts';
import ContactsForm from './components/ContactsForm';
import NameFilterer from './components/NameFilter';

//helpers
import axiosServices from './services/persons';

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
		axiosServices.getAll()
			.then(returnedPersons => {
				setPersons(returnedPersons);
				setFilteredPersons(returnedPersons);
			})
			.catch(error => console.log(`error: ${error}`));
	}, []);

	function addName(name) {
		if (!name) return;
		setNewPerson({ ...newPerson, name: name });
	}

	function addNumber(number) {
		if (!number) return;
		setNewPerson({ ...newPerson, number: number });
	}

	function addPerson(newPerson, persons) {
		const { name, number } = newPerson;
		addName(name);
		addNumber(number);
		axiosServices.create(newPerson)
			.then(returnedPersons => {
				setPersons(persons.concat(returnedPersons));
				setFilteredPersons(persons.concat(returnedPersons));
			})
		setNewPerson({ ...newPerson, id: newPerson.length + 1 });
	}

	const deletePerson = (id, name) => {
		if (window.confirm(`Delete ${name}`)) {
			axiosServices
				.delete(id)
				.then(returnedPersons => {
					const deleteById = person => person.id !== id;
					setPersons(persons.filter(deleteById));
					setFilteredPersons(persons.filter(deleteById));
				})
		} else {
			console.log(`Canceled deletion of ${name}'s number`);
		}

	}
	function clearInputs() {
		setNewPerson({ ...newPerson, name: '', number: '' });
	}

	// propmpt the user about existing person
	// and ask to replace the number or not
	function confirmReplaceNumber(name) {
		return window.confirm(`${name} is already added to phonebook, replace the old number with a new one?`);
	}
	const filterByPropValue = (propKey) => persons.filter(person => person[propKey] === newPerson[propKey]);
	const isPersonNameExists = filterByPropValue('name').length;


	const replaceOldNumber = (person, newPerson) => {
		const { id } = person;
		const { number, name } = newPerson;
		if (confirmReplaceNumber(name)) {
			const modifiedInfo = { ...person, number: number };
			axiosServices
				.update(id, modifiedInfo)
				.then(returnedPerson => {
					const modifyCopyOfPersons = () => persons.map(person => {
						return person.id === id ? returnedPerson : person;
					})
					setPersons(modifyCopyOfPersons);
					setFilteredPersons(modifyCopyOfPersons);
				})
		}
	}
	function submitForm(e) {
		e.preventDefault();
		if (!newPerson.name.length) return;
		if (isPersonNameExists) {
			const existingPerson = filterByPropValue('name')[0];
			replaceOldNumber(existingPerson, newPerson);
		} else {
			addPerson(newPerson, persons);
		}
		clearInputs();
	}

	return (
		<div>
			<h2>Phonebook</h2>
			<NameFilterer persons={persons} setFilteredPersons={setFilteredPersons} />
			<h2>add a new</h2>
			<ContactsForm submitForm={submitForm} setNewPerson={setNewPerson} newPerson={newPerson} />
			<h2>Numbers</h2>
			<Contacts persons={filteredPersons} deletePerson={deletePerson} />
		</div>
	)
};

export default App;
