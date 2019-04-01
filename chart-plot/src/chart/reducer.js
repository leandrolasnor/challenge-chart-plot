/* eslint-disable prefer-destructuring */
const INITIAL_STATE = {
  data: {
    labels: [],
    datasets: []
  },
  options: {
    scales: {
      xAxes: [
        {
          ticks: {
            callback(value, _index) {
              return new Date(parseInt(value, 0)).toLocaleString();
            }
          }
        },
        {
          display: true,
          position: "right"
        }
      ]
    },
    time: {
      min: 0,
      max: 9999999999999
    }
  },
  select: [],
  group: [],
  span: { begin: 0, end: 9999999999999 },
  haveEventsPlotted: false,
  executing: false
};

const getColor = alpha => {
  const o = Math.round;
  const r = Math.random;
  const s = 255;
  const a = alpha || r().toFixed(1);
  return `rgba(${o(r() * s)},${o(r() * s)},${o(r() * s)},${a})`;
};

const setEventDatasetChart = (datasets, event, select, group) => {

  let datasetsInProcess = datasets;
  let labelGroup = '';
  let labels = [];
  let i = 0;
  let willBeInserted = [];

  for (i = 0; i < group.length; i += 1) {
    labelGroup += `${event[group[i]]} `;
  }
  labelGroup = labelGroup.trim();

  for (i = 0; i < select.length; i += 1) {
    labels.push(`${select[i]} ${labelGroup}`);
    willBeInserted.push(`${select[i]} ${labelGroup}`);
  }

  datasetsInProcess = datasetsInProcess.map(item => {
    let { label } = item;
    for (i = 0; i < labels.length; i += 1) {
      if (label === labels[i]) {
        let field = label.split(' ')[0];
        item.data.push(event[field]);
        break;
      }
    }
    if (i < labels.length) {
      let index = willBeInserted.findIndex(item => item === labels[i]);
      willBeInserted.splice(index, 1);
    }
    return item;
  });
  for (i = 0; i < willBeInserted.length; i += 1) {
    const backgroundColor = getColor('0.1');
    const borderColor = getColor('0.7');

    datasetsInProcess.push({
      label: `${willBeInserted[i]}`,
      data: [`${event[willBeInserted[i].split(' ')[0]]}`],
      fill: false,
      backgroundColor,
      borderColor,
      lineTension: 0.1,
      pointBorderColor: borderColor,
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: borderColor,
      pointHoverBorderColor: borderColor,
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10
    });
  }
  return datasetsInProcess;
};

const spanValid = (span, timestamp) => {
  return timestamp >= span.begin && timestamp <= span.end;
};

export default function (state = INITIAL_STATE, action) {
  let options = {};
  let timestamp = null;
  let { data } = state;
  switch (action.type) {
    case "START":
      return {
        ...state,
        executing: true,
        haveEventsPlotted: true,
        select: action.payload.select,
        group: action.payload.group
      };
    case "STOP":
      return { ...state, executing: false };
    case "CHART_SPAN":
      options = state.options;
      options = {
        time: {
          min: action.payload.begin,
          max: action.payload.end
        }
      };
      return {
        ...state,
        span: {
          begin: action.payload.begin,
          end: action.payload.end
        },
        options
      };
    case "CHART_DATA":
      timestamp = action.payload.timestamp;
      if (!state.executing) {
        return state;
      }
      if (!spanValid(state.span, timestamp)) {
        return state;
      }
      if (
        data.labels.filter(label => {
          return label === timestamp;
        }).length === 0
      ) {
        data.labels.push(timestamp);
        if (data.labels.length === 5) {
          data.labels.splice(0, 1);
        }
      }
      data.datasets = setEventDatasetChart(
        data.datasets,
        action.payload,
        state.select,
        state.group
      );
      return { ...state, data };
    case "REINICIALIZE":
      return {
        data: { labels: [], datasets: [] },
        haveEventsPlotted: false,
        executing: false,
        select: [],
        group: []
      };
    default:
      return state;
  }
}
