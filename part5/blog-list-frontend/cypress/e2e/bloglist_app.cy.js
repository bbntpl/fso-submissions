describe('template spec', () => {
	beforeEach(function () {
		cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)

		const user = {
			name: 'B.B. Antipolo',
			username: 'bvrbrynntpl',
			password: 'hehehe'
		}

		const user2 = {
			name: 'Beaver Ant',
			username: 'vansab',
			password: 'huhahu'
		}

		// create two users and store it to the user collection
		cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
		cy.request('POST', `${Cypress.env('BACKEND')}/users`, user2)
		cy.visit('')
	})

	it('Login form is shown', function () {
		//making sure the login form is visible after the initial visit
		cy.get('#login-form').contains('username')
		cy.get('#login-form').contains('password')
		cy.get('#login-form').contains('login')
	})

	describe('Login', function () {
		it('succeeds with correct credentials', function () {
			// type username/pwd and submit form
			cy.get('#username-input').type('bvrbrynntpl')
			cy.get('#password-input').type('hehehe')
			cy.get('#login-btn').click()

			// verify if the name matches with the user's name and user details are displayed
			cy.contains('B.B. Antipolo')
			cy.get('.user-details').find('button').should('have.text', 'logout')
			cy.contains('successfully logged in!')
		})

		it('fails with wrong credentials', function () {
			cy.get('#username-input').type('bvrbrynntpl')
			cy.get('#password-input').type('hihihi')
			cy.get('#login-btn').click()

			cy.get('.notif-error').should('have.css', 'border-color', 'rgb(255, 0, 0)')
				.and('have.css', 'color', 'rgb(255, 0, 0)')
				.and('have.text', 'invalid username or password' || 'Wrong username of password')
		})

		describe('When logged in', function () {
			beforeEach(function () {
				cy.login({ username: 'bvrbrynntpl', password: 'hehehe' })

				cy.addBlog({ title: 'title0', author: 'author0', url: 'url0.com' })
			})

			it('creates a blog by user', function () {
				cy.contains('create new blog').click()
				cy.get('#blog-title-input').type('this is title')
				cy.get('#blog-author-input').type('this is author')
				cy.get('#blog-url-input').type('www.thisiswebsite.com')
				cy.get('#blog-submit-btn').contains('create').click()

				cy.get('#blog-form-wrapper').should('not.exist')

				cy.contains('this is title this is author')
			})

			it('likes a blog by user', () => {
				cy.get('.blog').children().contains('title0 author0').as('blogDetail')
				cy.get('@blogDetail').find('button').click()

				cy.get('@blogDetail').parent()
					.get('button').contains('like')
					.click()

				cy.contains('likes 1')
			})

			describe('Blog added', function () {
				beforeEach(function () {
					cy.addBlog({ title: 'title1', author: 'author1', url: 'url1.com' })
					cy.addBlog({ title: 'title2', author: 'author2', url: 'url2.com' })
					cy.addBlog({ title: 'title3', author: 'author3', url: 'url3.com' })

					cy.contains('logout').click()
					cy.login({ username: 'vansab', password: 'huhahu' })
					cy.addBlog({ title: 'title4', author: 'author4', url: 'url4.com' })

					cy.contains('logout').click()
					cy.login({ username: 'bvrbrynntpl', password: 'hehehe' })
				})

				it('listed blogs', function () {
					cy.contains('title1 author1')
					cy.contains('title2 author2')
					cy.contains('title3 author3')
					cy.contains('title4 author4')
				})

				it('deletes a blog owned by user', function () {
					cy.get('.blog').children().contains('title3 author3').as('blogDetail')
					cy.get('@blogDetail').find('button').click()

					cy.get('@blogDetail').parent().contains('remove').click()

					cy.contains('Successfully deleted title3 by author3')
				})

				it('prevents user from deleting unowned blog', function () {
					cy.get('.blog').children().contains('title4 author4').as('blogDetail')
					cy.get('@blogDetail').find('button').click()

					cy.get('@blogDetail').parent().contains('remove').should('not.exist')
				})

				it('sort blogs by highest to lowest likes', function () {
					cy.get('.blog .blog-title > button').each($el => {
							cy.wrap($el).click()
					})

					cy.get('.blog .blog-likes > button').each(($el, index) => {
						let i = 0
						while (i < index + 1) {
							i++
							cy.wait(500)
							cy.wrap($el).click()
						}
					})

					cy.get('.blog').eq(0).should('contain', 'title4 author4')
					cy.get('.blog').eq(1).should('contain', 'title3 author3')
					cy.get('.blog').eq(2).should('contain', 'title2 author2')
					cy.get('.blog').eq(3).should('contain', 'title1 author1')
					cy.get('.blog').eq(4).should('contain', 'title0 author0')
				})
			})
		})
	})
})