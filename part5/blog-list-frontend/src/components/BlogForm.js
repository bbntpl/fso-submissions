import { useState } from 'react';

const BlogForm = ({
	updateBlogs,
	createBlog,
}) => {
	const initBlog = {
		title: '',
		author: '',
		url: ''
	}
	const [blog, setBlog] = useState(initBlog)

	const handleSubmit = (event) => {
		event.preventDefault();
		createBlog(blog)

		setBlog({ ...initBlog });
		updateBlogs();
	}

	const handleChange = (key) => (event) => {
		setBlog(blog => ({
			...blog,
			[key]: event.target.value
		}))
	}

	return (
		<div>
			<h1>create new blog</h1>
			<form onSubmit={handleSubmit}>
				<div>
					title:
					<input
						type="title"
						value={blog.title}
						name="Title"
						onChange={handleChange('title')}
					/>
				</div>
				<div>
					author:
					<input
						type="text"
						value={blog.author}
						name="Author"
						onChange={handleChange('author')}
					/>
				</div>
				<div>
					url:
					<input
						type="text"
						value={blog.url}
						name="Url"
						onChange={handleChange('url')}
					/>
				</div>
				<button type="submit">create</button>
			</form>
		</div>
	)
}

export default BlogForm;