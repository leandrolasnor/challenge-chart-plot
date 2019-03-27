import { combineReducers } from 'redux'
import DashboardReducer from '../dashboard/reducer'
import CodeReducer from '../code/reducer'
import { reducer as toastrReducer } from 'react-redux-toastr'

const rootReducer = combineReducers({
    dashboard: DashboardReducer,
    editor: CodeReducer,
    toastr: toastrReducer
})

export default rootReducer