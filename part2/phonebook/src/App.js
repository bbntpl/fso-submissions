import { useState, useEffect } from 'react';

import personService from './services/persons';

import Notification from './components/Notification';
import SearchFilter from './components/SearchFilter';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';

const App = () => {
	const initialNotifObj = {
		message: null,
		type: 'msg'
	}

	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [notifObj, setNotifObj] = useState(initialNotifObj);
	const [filterKeyword, setFilterKeyword] = useState('');

	// fetch data from json server using axios library
	useEffect(() => {

		const initializeData = initialData => {
			setPersons(initialData);
		};

		personService.getAll().then(initializeData);
	}, [])

	// event handlers
	const handleNameChange = (event) => {
		setNewName(event.target.value);
	}

	const handleNumberChange = (event) => {
		setNewNumber(event.target.value);
	}

	const handleFilterKeywordChange = (event) => {
		setFilterKeyword(event.target.value);
	}

	const handleDelete = (person) => {
		const { name, id } = person;
		if (window.confirm(`Delete ${name} ?`)) {
			personService.deletePerson(id)
				.then(deletedData => {
					console.log('This object is deleted: ', deletedData);
					setPersons(persons => persons.filter(person => person.id !== id));
				});
		}
	}

	const notifyUser = (message, type = 'message') => {
		setNotifObj({message, type})

		setTimeout(() => {
			setNotifObj(initialNotifObj);
		}, 5000)
	}

	const isPersonDuplicated = (newName) => {
		return persons.some(person => person.name === newName);
	}

	const updateNumber = (newNumber) => {
		const person = persons.find(person => person.name === newName);
		const personWithNewNumber = {
			...person,
			number: newNumber,
		}

		personService.update(person.id, personWithNewNumber).then(updatedData => {
			setPersons(persons => persons.map(p => {
				return p.id === person.id ? updatedData : p;
			}));
		})
		.catch((error) => {
			console.log(error);
			const errorMsg = `Information ${person.name} has already been removed from server`;
			notifyUser(errorMsg, 'error');
		})
	}

	const addPerson = (newPersonObject) => {
		personService.create(newPersonObject).then(returnedPerson => {
			setPersons(persons.concat(returnedPerson));
			notifyUser(`Added ${newPersonObject.name}`);
		});
	}

	const submitPersonInfo = (event) => {
		event.preventDefault();
		const newPersonObject = {
			name: newName,
			number: newNumber
		}

		const textConfirmation = `${newName} is already added to phonebook, replace the old number with a new one?`
		if (isPersonDuplicated(newName)) {
			if (window.confirm(textConfirmation)) {
				updateNumber(newNumber);
			}
		} else {
			addPerson(newPersonObject);
		}

		setNewName('');
		setNewNumber('');
	}

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification notifObj={notifObj} />
			<SearchFilter
				handleChange={handleFilterKeywordChange}
				value={filterKeyword}
			/>
			<h3>Add a new</h3>
			<PersonForm
				newName={newName}
				newNumber={newNumber}
				handleNameChange={handleNameChange}
				handleNumberChange={handleNumberChange}
				submitPersonInfo={submitPersonInfo}
			/>
			<h3>Numbers</h3>
			<Persons
				persons={persons}
				filterKeyword={filterKeyword}
				handleDelete={handleDelete}
			/>
		</div>
	)
}

export default App;
