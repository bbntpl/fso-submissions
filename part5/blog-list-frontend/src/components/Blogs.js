import Blog from './Blog';

const Blogs = ({ blogs }) => (
	<div>
		{blogs.map(blog =>
			<Blog key={blog.id} blog={blog} />
		)}
	</div>
)

export default Blogs;