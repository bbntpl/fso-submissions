export default function Notification({ errors }) {
	if (!errors) {
		return null
	}
	
	return <div style={{ color: 'red' }}>
		{
			errors.map((err, index) => {
				return <p key={index}>- {err}</p>
			})
		}
	</div>
}