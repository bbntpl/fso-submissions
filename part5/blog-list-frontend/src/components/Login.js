import PropTypes from 'prop-types'

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

Login.propTypes = {
	loginHandlers: PropTypes.object.isRequired,
	username: PropTypes.string.isRequired,
	password: PropTypes.string.isRequired
}

export default Login;