const ContactsForm = ({ submitForm, newPerson, setNewPerson }) => {
	const handleNameByChange = (e) => setNewPerson({ ...newPerson, name: e.target.value });
	const handleNumberByChange = (e) => setNewPerson({ ...newPerson, number: e.target.value });
	return (
		<form>
			<div>
				<div>
					name: <input value={newPerson.name} onChange={handleNameByChange} />
				</div>
				<div>
					number: <input value={newPerson.number} onChange={handleNumberByChange} />
				</div>
			</div>
			<div>
				<button
					type="submit"
					onClick={submitForm}
				>add</button>
			</div>
		</form>
	)
}

export default ContactsForm;