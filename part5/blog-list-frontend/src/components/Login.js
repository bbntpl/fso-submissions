const Login = (props) => {
	const {
		username,
		password,
		loginHandlers
	} = props;
	const {
		submitUserCredentials,
		changeUsername,
		changePassword
	} = loginHandlers;

	return (
		<>
			<form onSubmit={submitUserCredentials}>
				<div>
					username
					<input
						type="text"
						value={username}
						name="Username"
						onChange={changeUsername}
					/>
				</div>
				<div>
					password
					<input
						type="password"
						value={password}
						name="Password"
						onChange={changePassword}
					/>
				</div>
				<button type="submit">login</button>
			</form>
		</>
	)
}

export default Login;