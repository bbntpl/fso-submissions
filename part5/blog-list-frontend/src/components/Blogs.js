import Blog from './Blog';

const Blogs = ({ blogs, updateBlog, deleteBlog, isBlogOwnedByUser }) => {
	const sortedBlogsByHighestLikes = blogs.sort((a, b) => b.likes - a.likes)
	return (
		blogs.length === 0
			? <div>There are no blogs yet</div>
			: <div>
				{sortedBlogsByHighestLikes.map(blog =>
					<Blog
						key={blog.id}
						blog={blog}
						updateBlog={updateBlog}
						deleteBlog={deleteBlog}
						isBlogOwnedByUser={isBlogOwnedByUser}
					/>
				)}
			</div>
	)
}

export default Blogs;