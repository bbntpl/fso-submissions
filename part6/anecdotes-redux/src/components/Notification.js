import { useSelector } from 'react-redux'

const Notification = (props) => {
	const notification = useSelector(state => state.notification)
	const { isTimerRunning, content } = notification
	const style = {
		border: 'solid',
		padding: 10,
		borderWidth: 1
	}

	return (
		(isTimerRunning && content) && < div style={style} >
			{notification}
		</div >
	)
}

export default Notification