const ContactsForm = ({ addName, newName, setNewName }) => {
	const handleNameByChange = (e) => setNewName(e.target.value);
	return (
		<form>
			<div>
				name: <input value={newName} onChange={handleNameByChange} />
			</div>
			<div>
				<button
					type="submit"
					onClick={addName}
				>add</button>
			</div>
		</form>
	)
}

export default ContactsForm;