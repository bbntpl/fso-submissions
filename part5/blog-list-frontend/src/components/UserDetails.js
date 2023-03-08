const UserDetails = (prop) => {
	const { name, logoutUser } = prop;

	return (
		<div>
			{name}
			<button onClick={logoutUser}>logout</button>
		</div>
	)
}

export default UserDetails;