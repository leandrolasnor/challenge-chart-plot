export default function reinicialize() {
  return dispatch => {
    dispatch([{ type: "REINICIALIZE" }, { type: "EDITOR_UNBLOCKED" }]);
  };
}
