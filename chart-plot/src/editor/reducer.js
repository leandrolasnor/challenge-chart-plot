const INITIAL_STATE = {
    inputs: `{"type": "start", "timestamp": "1519780251293", "select": ["min_response_time", "max_response_time"], "group":["os", "browser"]}
{"type": "span", "timestamp": "1519780251993", "begin": "23546572836472", "end": "23546572836472"}
{"type": "data", "timestamp": "1519780252293", "os": "linux", "browser": "chrome", "min_response_time":"23546572836472", "max_response_time":"23546572836472"}
{"type": "stop", "timestamp": "1519780253293"}`,
    blocked: false
}

export default function(state = INITIAL_STATE, action){
    switch(action.type){
        case 'SET_INPUTS':
            return {...state, inputs:action.payload, tmpInputs:action.payload}
        case 'EDITOR_BLOCKED':
            return {...state, blocked: true}
        case 'EDITOR_UNBLOCKED':
            return {...state, blocked: false, tmpInputs: state.inputs}
        default:
            return state
    }
}