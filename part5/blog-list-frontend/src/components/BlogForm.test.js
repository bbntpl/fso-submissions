import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('display new blog component', async () => {
	const mockCreateHandler = jest.fn()
	const mockUpdateHandler = jest.fn()

	render(<BlogForm
		createBlog={mockCreateHandler}
		updateBlogs={mockUpdateHandler}
	/>)
	const user = userEvent.setup()

	const createBtn = screen.getByText('create')

	await user.click(createBtn)

	expect(mockCreateHandler).toHaveBeenCalledTimes(1)
	expect(mockUpdateHandler).toHaveBeenCalledTimes(1)
})