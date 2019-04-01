import { toastr } from "react-redux-toastr";

export function setInputs(inputs) {
  return dispatch => {
    dispatch([{ type: "SET_INPUTS", payload: inputs }]);
  };
}

export function editorBlock() {
  return dispatch => {
    dispatch({ type: "EDITOR_BLOCKED" });
  };
}

export function editorUnblock() {
  return dispatch => {
    dispatch({ type: "EDITOR_UNBLOCKED" });
  };
}

export function inputsToDispatches(lot) {
  try {
    let formattingLot = lot.replace(/(\r\n|\n|\r)/gm, "");
    formattingLot = formattingLot.split("}");
    formattingLot.pop();
    const dispatches = formattingLot.map(value => {
      let event = JSON.parse(`${value.trim()}}`);
      let eventType = `CHART_${event.type.toUpperCase()}`;
      if ('START STOP'.indexOf(event.type.toUpperCase()) >= 0) {
        eventType = `${event.type.toUpperCase()}`;
        event['input'] = `${value.trim()}}`
      }
      delete event.type;
      return [
        { type: eventType, payload: { ...event } },
        { type: 'REMOVE_INPUT_EDITOR', payload: `${value.trim()}}` }
      ];
    });
    return dispatches;
  } catch (e) {
    return [];
  }
}

export function dispatchDataCharts(inputs) {
  return dispatch => {
    let inputsInProcess = inputs;
    let lot = "";
    let dispatches = [];
    while (inputsInProcess) {
      lot = inputsInProcess.substring(0, inputsInProcess.indexOf('}') + 1);
      if (!lot)
        break;
      try {
        JSON.parse(lot);
        dispatches = inputsToDispatches(lot);
        dispatch([...dispatches]);
      } catch {
        toastr.warning("CHECK THIS INPUT", lot);
      }
      inputsInProcess = inputsInProcess.replace(lot, "");
      inputsInProcess = inputsInProcess.trim();
    }
  };
}
