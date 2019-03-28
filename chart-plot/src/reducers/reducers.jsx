import { combineReducers } from 'redux'
import ChartReducer from '../chart/reducer'
import EditorReducer from '../editor/reducer'
import { reducer as toastrReducer } from 'react-redux-toastr'

const rootReducer = combineReducers({
    chart: ChartReducer,
    editor: EditorReducer,
    toastr: toastrReducer
})

export default rootReducer