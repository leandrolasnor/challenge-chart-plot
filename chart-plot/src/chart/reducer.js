const INITIAL_STATE = {
    data: {
        labels:[],
        datasets: []
    },
    events: [],
}

export default function(state = INITIAL_STATE, action){
    switch(action.type){
        case 'CHART_START':
            return {...INITIAL_STATE}
        case 'CHART_STOP':
            return state
        case 'CHART_SPAN':
            console.log(action.payload)
            return {...state}
        case 'CHART_DATA':
            console.log(action.payload)
            var events = state.events
            events.push(action.payload)
            return {...state, events}
        default:
            return state
    }
}