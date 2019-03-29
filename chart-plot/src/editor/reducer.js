const INITIAL_STATE = {
    inputs: 
`{"type": "start", "timestamp": "1519862400000", "select": ["min_response_time", "max_response_time"], "group":["os", "browser"]}
{"type": "span", "timestamp": "1519862400000", "begin": "1519862400000", "end": "1519862460000"}
{"type": "data", "timestamp": "1519862400000", "os": "linux", "browser": "chrome", "min_response_time":"0.1", "max_response_time":"1.3"}
{"type": "data", "timestamp": "1519862400000", "os": "mac", "browser": "chrome", "min_response_time":"0.2", "max_response_time":"1.2"}
{"type": "data", "timestamp": "1519862400000", "os": "mac", "browser": "firefox", "min_response_time":"0.3", "max_response_time":"1.2"}
{"type": "data", "timestamp": "1519862400000", "os": "linux", "browser": "firefox", "min_response_time":"0.1", "max_response_time":"1.0"}
{"type": "data", "timestamp": "1519862460000", "os": "linux", "browser": "chrome", "min_response_time":"0.2", "max_response_time":"0.9"}
{"type": "data", "timestamp": "1519862460000", "os": "mac", "browser": "chrome", "min_response_time":"0.1", "max_response_time":"1.0"}
{"type": "data", "timestamp": "1519862460000", "os": "mac", "browser": "firefox", "min_response_time":"0.2", "max_response_time":"1.1"}
{"type": "data", "timestamp": "1519862460000", "os": "linux", "browser": "firefox", "min_response_time":"0.3", "max_response_time":"1.4"}
{"type": "stop", "timestamp": "1519862460000"}`,
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