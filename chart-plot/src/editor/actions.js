export function set_inputs(inputs){
    return dispatch => {
        dispatch({type: 'SET_INPUTS', payload: inputs})
    }
}

export function dispatch_data_charts(inputs){
    try{
        let formattingCode = inputs.replace(/(\r\n|\n|\r)/gm,"")
        formattingCode = formattingCode.split('}')
        formattingCode.pop()
        const eventsList = formattingCode.map(function(value, index){
            return JSON.parse(`${value.trim()}}`)
        })
        const dispatches = eventsList.map(function(event, index){
            var eventType = `CHART_${event.type.toUpperCase()}`
            delete event.type
            return {
                type: eventType,
                payload: {...event}
            }
        })
        return dispatch => {
            dispatch([...dispatches])
        }
    }catch{
        alert("ENTRADA INVÁLIDA")
    }
    
}