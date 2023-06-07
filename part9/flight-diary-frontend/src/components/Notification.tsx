import { NotificationObject } from '../types';

interface NotificationParams {
	notifObject: NotificationObject;
}

const Notification = (props: NotificationParams) => {
const { notifObject } = props;

	const textColor = notifObject.type === 'error' ? 'red' : 'green';

	return <p style={{ color: textColor }}>{notifObject.message}</p>
}

export default Notification;