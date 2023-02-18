const PersonForm = (props) => {
	const {
		newName,
		newNumber,
		handleNameChange,
		handleNumberChange,
		submitPersonInfo
	} = props;

	return (
		<div>
			<form>
				<div>
					name: <input onChange={handleNameChange} value={newName} />
				</div>
				<div>number: <input onChange={handleNumberChange} value={newNumber} /></div>
				<div>
					<button type="submit" onClick={submitPersonInfo}>add</button>
				</div>
			</form>
		</div>
	)
}

export default PersonForm;