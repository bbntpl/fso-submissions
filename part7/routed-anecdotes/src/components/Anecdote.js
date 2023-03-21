const Anecdote = ({ anecdote }) => {
	const {
		content,
		author,
		info,
		votes
	} = anecdote

	return (
		<div>
			<h1>{content} by {author}</h1>
			<p>has {votes} votes</p>
			<span>
				for more info see <a href={info}>{info}</a>
			</span>
		</div>
	)
}

export default Anecdote