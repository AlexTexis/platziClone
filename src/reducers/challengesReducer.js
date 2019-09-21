const initialState = {
  challenges : {},
  challenge : {}
}

function challenges(state=initialState,action) {
  switch(action.type) {
    case 'SET_CHALLENGES' :
      return {
        ...state,
        challenges : action.payload
      } 
    case 'SET_CHALLENGE' :
      return {
        ...state,
        challenge : action.payload
      } 
    case 'ADD_CHALLENGE' :
      return {
        ...state,
        challenges : Object.assign(action.payload,state.challenges)
      } 
    default :
      return state
  }
}

export default challenges