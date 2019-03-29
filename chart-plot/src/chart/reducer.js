const INITIAL_STATE = {
    data: {
        labels:[],
        datasets: []
    },
    events: []
}

const getColor = (fat, tam) => {
    return fat*tam+1 <= 255 ? fat*tam+1 : 255-fat*tam+1
}

const setEventDatasetChart = (datasets, event) => {
    let newDataset = true
    datasets = datasets.map(function (item, index) {
        let { label } = item
        if (label.toLowerCase().indexOf('min') >= 0) {
            if (label.toLowerCase().indexOf(event.os) >= 0 && label.toLowerCase().indexOf(event.browser)) {
                item.data.push(event.min_response_time)
                newDataset = false
            }
        }else if (label.toLowerCase().indexOf('max') >= 0) {
            if (label.toLowerCase().indexOf(event.os) >= 0 && label.toLowerCase().indexOf(event.browser)) {
                item.data.push(event.max_response_time)
                newDataset = false
            }
        } 
        return item
    })
    if (newDataset) {
        datasets.push({
            label: `Min Response ${event.os} ${event.browser}`,
            data: [event.min_response_time],

            fill: false,
            lineTension: 0.1,
            backgroundColor: `rgba(${getColor(90,datasets.length)}, ${getColor(96,datasets.length)}, ${getColor(98,datasets.length)}, 0.1)`,
            borderColor: `rgba(${getColor(90,datasets.length)}, ${getColor(96,datasets.length)}, ${getColor(98,datasets.length)}, 0.7)`,
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: `rgba(${getColor(90,datasets.length)}, ${getColor(96,datasets.length)}, ${getColor(98,datasets.length)}, 0.7)`,
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: `rgba(${getColor(90,datasets.length)}, ${getColor(96,datasets.length)}, ${getColor(98,datasets.length)}, 0.7)`,
            pointHoverBorderColor: `rgba(${getColor(90,datasets.length)}, ${getColor(96,datasets.length)}, ${getColor(98,datasets.length)}, 0.7)`,
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10

        })
        datasets.push({
            label: `Max Response ${event.os} ${event.browser}`,
            data: [event.max_response_time],

            fill: false,
            lineTension: 0.1,
            backgroundColor: `rgba(${getColor(222,datasets.length)}, ${getColor(127,datasets.length)}, ${getColor(30,datasets.length)}, 0.1)`,
            borderColor: `rgba(${getColor(222,datasets.length)}, ${getColor(127,datasets.length)}, ${getColor(30,datasets.length)}, 0.7)`,
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: `rgba(${getColor(222,datasets.length)}, ${getColor(127,datasets.length)}, ${getColor(30,datasets.length)}, 0.7)`,
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: `rgba(${getColor(222,datasets.length)}, ${getColor(127,datasets.length)}, ${getColor(30,datasets.length)}, 0.7)`,
            pointHoverBorderColor: `rgba(${getColor(222,datasets.length)}, ${getColor(127,datasets.length)}, ${getColor(30,datasets.length)}, 0.7)`,
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10

        })
    } 
    return datasets
}

export default function (state = INITIAL_STATE, action) {
    let data = state.data
    let timestamp = null
    let events = state.events
    switch(action.type){
        case 'CHART_START':
            timestamp = new Date(parseInt(action.payload.timestamp)).toLocaleString()
            if (data.labels.filter(function (label) {return label === timestamp}).length === 0) {
                data.labels.push(timestamp)
            }
            return {...state, data}
        case 'CHART_STOP':
            timestamp = new Date(parseInt(action.payload.timestamp)).toLocaleString()
            if (data.labels.filter(function (label) {return label === timestamp}).length === 0) {
                data.labels.push(timestamp)
            }
            return {...state, data}
        case 'CHART_SPAN':
            return {...state}
        case 'CHART_DATA':
            timestamp = new Date(parseInt(action.payload.timestamp)).toLocaleString()
            if (data.labels.filter(function (label) {return label === timestamp}).length === 0) {
                data.labels.push(timestamp)
            }
            events.push(action.payload)
            data.datasets = setEventDatasetChart(data.datasets, action.payload)
            return { ...state, events, data }
        case 'REINICIALIZE':
            return {data: {labels:[],datasets: []},events: []}
        default:
            return state
    }
}