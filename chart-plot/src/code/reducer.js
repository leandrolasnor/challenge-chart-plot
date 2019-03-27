const INITIAL_STATE = {
    code: ``
}

export default function(state = INITIAL_STATE, action){
    switch(action.type){
        case 'CHANGE_CODE':
            return {...state, code:action.payload}
        default:
            return state
    }
}