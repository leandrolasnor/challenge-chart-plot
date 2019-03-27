export function valueChange(code){
    return dispatch => {
        dispatch({type: 'CHANGE_CODE', payload: code})
    }
}