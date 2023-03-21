const Notification = ({ notifications }) => {
	const style = {
		border: '1px solid black',
		margin: '2rem 0'
	}

	if (!notifications.length) return ''

	const notificationText = notifications[notifications.length - 1].text
	return (
		<div style={style}>
			{notificationText}
		</div>
	)
}

export default Notification