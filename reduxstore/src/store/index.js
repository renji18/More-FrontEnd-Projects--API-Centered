import { createStore } from 'redux'

const reducer = (state={counter:0}, action) => {

  // Synchronous function
  // We should not mutate the original state
  if(action.type === 'INC'){
    return {counter:state.counter+1}
  } else if(action.type === 'DESC'){
    return {counter:state.counter-1}
  } else if(action.type === 'ADD'){
    return {counter:state.counter + action.payload || 100}
  }
  return state
}

const store = createStore(reducer)

export default store