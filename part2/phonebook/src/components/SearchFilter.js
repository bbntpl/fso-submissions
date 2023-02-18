const SearchFilter = ({ handleChange, filterKeyword }) => {
	return (
		<div>
			filter shown with:
			<input
				onChange={handleChange}
				value={filterKeyword}
			/>
		</div>
	)
}

export default SearchFilter;