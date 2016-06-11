
export default function example2(state = [], action){
  switch (action.type) {
    case 'EX2_ADD':
      // prevent duplicates
      if(state.indexOf(action.text) > -1){
        return state
      }
      return [
        ...state,
        action.text
      ]
    default:
      return state
  }
}
