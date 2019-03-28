const INITIAL_STATE = {
    inputs: `{"type": "start", "timestamp": "23546572836472", "select": ["min_response_time", "max_response_time"], "group":["os", "browser"]}
{"type": "span", "timestamp": "23546572836472", "begin": "23546572836472", "end": "23546572836472"}
{"type": "data", "timestamp": "23546572836472", "os": "linux", "browser": "chrome", "min_response_time":"23546572836472", "max_response_time":"23546572836472"}
{"type": "stop", "timestamp": "23546572836472"}`
}

export default function(state = INITIAL_STATE, action){
    switch(action.type){
        case 'SET_INPUTS':
            return {...state, inputs:action.payload}
        default:
            return state
    }
}