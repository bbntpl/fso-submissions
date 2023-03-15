const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  const prop = action.type.toLowerCase();
  switch (action.type) {
    case 'GOOD':
      return {...state, [prop]: state[prop] + 1}
    case 'OK':
      return {...state, [prop]: state[prop] + 1}
    case 'BAD':
      return {...state, [prop]: state[prop] + 1}
    case 'ZERO':
      return {...state, ...initialState}
    default: return state
  }

}

export default counterReducer