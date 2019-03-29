import { toastr } from 'react-redux-toastr'

export function set_inputs(inputs) { return dispatch => { dispatch({ type: 'SET_INPUTS', payload: inputs }) } }

export function editor_block(){
    return dispatch => {
        dispatch({type:'EDITOR_BLOCKED'})
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

export function dispatch_data_charts(inputs) {
    return dispatch => {
        var lot = ''
        var existLineInvalid = false
        var quantLinesInvalid = 0
        while (inputs) {
            lot = inputs.substring(0, inputs.indexOf('}') + 1)
            try {
                JSON.parse(lot)
                var dispatches = inputs_to_dispatches(lot)
                dispatch([...dispatches])
            } catch{
                existLineInvalid = true
                quantLinesInvalid++
            }
            inputs = inputs.replace(lot,'')
        }
        if (existLineInvalid) {
            toastr.warning('Opss...', `( ${quantLinesInvalid} ) invalid inputs`)
            dispatch({type: 'EDITOR_UNBLOCKED'})
        }
    }
}