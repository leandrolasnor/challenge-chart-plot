const INITIAL_STATE = {
    data: {
        labels:[],
        datasets: [
            {
                label: 'Min Response Linux Chrome',
                data: []
            },{
                label: 'Min Response Linux Firefox',
                data: []
            },{
                label: 'Min Response Win10 Chrome',
                data: []
            },{
                label: 'Min Response Win10 Firefox',
                data: []
            }
        ]
    },
    min: [],
    max:[]
}

export default function(state = INITIAL_STATE, action){
    let data = null
    let timestamp = null
    let min = null
    let max = null
    switch(action.type){
        case 'CHART_START':
            data = INITIAL_STATE.data
            timestamp = new Date(parseInt(action.payload.timestamp)).toLocaleString()
            data.labels.push(timestamp)
            return {...INITIAL_STATE, data}
        case 'CHART_STOP':
            return state
        case 'CHART_SPAN':
            //console.log(action.payload)
            return {...state}
        case 'CHART_DATA':
            min = state.min
            max = state.max
            data = state.data
            timestamp = new Date(parseInt(action.payload.timestamp)).toLocaleString()
            data.labels.push(timestamp)
            min.push(action.payload.min_response_time)
            max.push(action.payload.max_response_time)
            data.datasets = data.datasets.map(function(item,index){
                if(
                    item.label.indexOf(action.payload.os) >= 0
                    && item.label.indexOf(action.payload.browser) >= 0
                    && item.label.indexOf('min') >= 0
                ){
                    item.data.push(action.payload.min_response_time)
                }else if(
                    item.label.indexOf(action.payload.os) >= 0
                    && item.label.indexOf(action.payload.browser) >= 0
                    && item.label.indexOf('max') >= 0
                ){
                    item.data.push(action.payload.max_response_time)
                }
                return item
            })
            console.log(data.datasets)

            return {...state, min,max, data}
        default:
            return state
    }
}