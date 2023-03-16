const Notification = ({content}) => {
	const style = {
		border: 'solid',
		padding: 10,
		borderWidth: 1
	}

	return (
		< div style={style} >
			{content}
		</div >
	)
}

export default Notification