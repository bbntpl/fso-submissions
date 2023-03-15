import StatLine from './StatLine'

const Stats = ({ data }) => {
	const stats = []
	for (const [key, value] of Object.entries(data)) {
		stats.push({ opinion: key, numOfOpinions: value })
	}
	console.log(stats)
	return stats.map((stat, index) => {
		return <StatLine
			key={index}
			opinion={stat.opinion}
			numOfOpinions={stat.numOfOpinions}
		/>
	})
}

export default Stats