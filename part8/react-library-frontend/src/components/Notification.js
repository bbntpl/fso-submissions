export default function Notification({ messages, type = 'error' }) {
	if (!messages) {
		return null
	}

	const notifStyles = {
		color: `${type === 'error' ? 'red' : 'green' }`
	}
	
	return <div style={notifStyles}>
		{
			messages.map((msg, index) => {
				return <p key={msg}>- {msg}</p>
			})
		}
	</div>
}