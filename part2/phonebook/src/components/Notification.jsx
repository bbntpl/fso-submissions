const Notification = ({ notifProps, setNotifProps }) => {
	const { color, message } = notifProps;
	if (message === null) {
		return null;
	}
	return (
		<div className={`${color}-notifier`}>
			{message}
		</div>
	)
}

export default Notification;