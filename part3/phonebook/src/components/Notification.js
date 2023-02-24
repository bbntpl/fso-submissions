const Notification = ({ notifObj }) => {
	const {
		type,
		message,
	} = notifObj;

	if (message === null) {
		return null;
	}

	return (
		<div className={`notification-${type}`}>
			{message}
		</div>
	)
}

export default Notification;