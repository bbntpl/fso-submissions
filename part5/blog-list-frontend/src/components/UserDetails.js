const UserDetails = (prop) => {
	const { name, logoutUser } = prop;

	return (
		<div style={{'margin': '1rem 0'}}>
			{name}
			<button onClick={logoutUser}>logout</button>
		</div>
	)
}

export default UserDetails;