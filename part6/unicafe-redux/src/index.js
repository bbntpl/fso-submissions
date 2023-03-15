import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'

import Stats from './components/Stats'
import reducer from './reducer'

const store = createStore(reducer)

const handleClick = (type) => (_) => {
	store.dispatch({ type })
}

const App = () => {
	return (
		<div>
			<div>
				<button onClick={handleClick('GOOD')} >good</button>
				<button onClick={handleClick('OK')} >ok</button>
				<button onClick={handleClick('BAD')} >bad</button>
				<button onClick={handleClick('ZERO')} >reset stats</button>
			</div>
			<Stats data={store.getState()} />
		</div>
	)
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
	root.render(<App />)
}

renderApp()
store.subscribe(renderApp)