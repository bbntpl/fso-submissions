import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

jest.mock('../services/blogs')

describe('<Blog />', () => {
	let container;
	const blog = {
		title: 'How to reset your life',
		author: 'Johnny Spinach',
		likes: 1,
		url: 'http://johnnyspinach.com',
		user: {
			name: 'JSpinach',
			username: 'jspinach76'
		},
		id: '640b9c96e56fcfba4888e4ba'
	};
	const mockUpdateHandler = jest.fn()

	beforeEach(() => {
		container = render(<Blog
			blog={blog}
			updateBlog={mockUpdateHandler}
			deleteBlog={jest.fn()}
		/>).container;
	})

	test('renders the blog\'s title and author while the rest aren\'t', () => {
		const blogTitle = container.querySelector('.blog-title')

		const blogUrl = container.querySelector('.blog-url')
		const blogLikes = container.querySelector('.blog-likes')
		const blogDetails = container.querySelector('.blog-details')

		expect(blogTitle).toHaveTextContent(`${blog.title} ${blog.author}`)

		expect(blogDetails).toHaveStyle('display: none')
		expect(blogUrl).not.toBeVisible()
		expect(blogLikes).not.toBeVisible()
	})

	test('renders full details of <Blog /> component', async () => {
		const user = userEvent.setup()
		const button = screen.getByText('show')

		await user.click(button)

		const blogDetails = container.querySelector('.blog-details')
		const blogLikes = container.querySelector('.blog-likes')
		const blogUrl = container.querySelector('.blog-url')

		expect(blogDetails).not.toHaveStyle('display: none')
		expect(blogUrl).toBeVisible()
		expect(blogLikes).toBeVisible()
		expect(blogLikes).toHaveTextContent('likes 1')
	})

	test('like button is clicked twice', async () => {
		const user = userEvent.setup()

		const toggleBtn = screen.getByText('show')
		const likeBtn = screen.getByText('like')

		await user.click(toggleBtn)
		await user.click(likeBtn)
		await user.click(likeBtn)

		const blogDetails = container.querySelector('.blog-details')

		expect(blogDetails).not.toHaveStyle('display: none')
		expect(mockUpdateHandler.mock.calls).toHaveLength(2)
		expect(mockUpdateHandler).toHaveBeenCalledTimes(2)
	})
})