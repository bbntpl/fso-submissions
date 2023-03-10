import { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog }) => {
	const [showBlogDetails, setShowBlogDetails] = useState(false)
	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}

	const deleteButtonStyle = {
		backgroundColor: 'lightblue',
		border: 'none',
		borderRadius: '4px',
		padding: '2px 4px',
		margin: '2px 1px'
	}

	const handleIncrementLikes = () => {
		updateBlog(blog.id, {
			...blog,
			likes: blog.likes + 1
		})
	}

	const toggleBlogDetails = () => {
		setShowBlogDetails(!showBlogDetails)
	}

	const handleDeletion = () => {
		if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
			deleteBlog(blog.id, blog)
		}
	}

	return (
		<div style={blogStyle}>
			<span>
				{blog.title} {blog.author}
				<button onClick={toggleBlogDetails}>{showBlogDetails ? 'hide' : 'show'}</button>
			</span>
			<div style={{ 'display': showBlogDetails ? '' : 'none' }}>
				<div>
					<a href={blog.url}>{blog.url}</a>
				</div>
				<div>
					<span>likes {blog.likes}
						<button onClick={handleIncrementLikes}>like</button>
					</span>
				</div>
				<div>{blog.user.name || blog.user.username}</div>
				<div>
					<button
						style={deleteButtonStyle}
						onClick={handleDeletion}
					>remove</button>
				</div>
			</div>
		</div>
	)
}

export default Blog