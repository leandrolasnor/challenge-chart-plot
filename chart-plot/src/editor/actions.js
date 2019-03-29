import { toastr } from "react-redux-toastr";

export function setInputs(inputs) {
  return dispatch => {
    dispatch({ type: "SET_INPUTS", payload: inputs });
  };
}

export function editorBlock() {
  return dispatch => {
    dispatch({ type: "EDITOR_BLOCKED" });
  };
}

export function inputsToDispatches(lot) {
  try {
    let formattingLot = lot.replace(/(\r\n|\n|\r)/gm, "");
    formattingLot = formattingLot.split("}");
    formattingLot.pop();
    const dispatches = formattingLot.map(value => {
      const event = JSON.parse(`${value.trim()}}`);
      const eventType = `CHART_${event.type.toUpperCase()}`;
      delete event.type;
      return {
        type: eventType,
        payload: { ...event }
      };
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
    let existLineInvalid = false;
    let quantLinesInvalid = 0;
    while (inputsInProcess) {
      lot = inputsInProcess.substring(0, inputsInProcess.indexOf("}") + 1);
      try {
        JSON.parse(lot);
        dispatches = inputsToDispatches(lot);
        dispatch([...dispatches]);
      } catch {
        existLineInvalid = true;
        quantLinesInvalid += 1;
      }
      inputsInProcess = inputsInProcess.replace(lot, "");
    }
    if (existLineInvalid) {
      toastr.warning("Opss...", `( ${quantLinesInvalid} ) invalid inputs`);
      dispatch({ type: "EDITOR_UNBLOCKED" });
    }
  };
}
