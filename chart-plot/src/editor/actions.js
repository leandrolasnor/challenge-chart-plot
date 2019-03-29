export function set_inputs(inputs){return dispatch => {dispatch({type: 'SET_INPUTS', payload: inputs})}}

export function editor_block(){
    return dispatch => {
        dispatch({type:'EDITOR_BLOCK'})
    }
}

export function inputs_to_dispatches(lot){
    try{
        var formattingLot = lot.replace(/(\r\n|\n|\r)/gm,"")
        formattingLot = formattingLot.split('}')
        formattingLot.pop()
        const dispatches = formattingLot.map(function(value, index){
            var event = JSON.parse(`${value.trim()}}`)
            var eventType = `CHART_${event.type.toUpperCase()}`
            delete event.type
            return {
                type: eventType,
                payload: {...event}
            }
        })
        return dispatches
    }catch(e){
        return []
    }
}

export function  dispatch_data_charts(inputs){
    return dispatch => {
        var lot = ''
        while(inputs){
            lot = inputs.substring(0,inputs.indexOf('}')+1)
            var dispatches = inputs_to_dispatches(lot)
            dispatch([...dispatches])
            inputs = inputs.replace(lot,'')
        }
        dispatch({type: 'EDITOR_UNBLOCKED'})
    }
}